import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/imgs/error.png'
import './index.scss'
import { useCallback, useEffect, useState } from 'react'
import { http } from 'src/utils'
import useStore from 'src/store'
import { observer } from 'mobx-react-lite'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelStore } = useStore()
  const [list, setList] = useState({
    list: [],
    count: 0
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 2
  })
  const loadListFunc = useCallback(async (_params) => {
    const res = await http.get('/mp/articles', { params: _params })
    const { results, total_count } = res.data
    setList({
      list: results,
      count: total_count
    })
  }, [])
  useEffect(() => {
    loadListFunc(params)
  }, [params, loadListFunc])
  const statusArr = ['草稿', '待审核', '审核通过', '审核失败']
  const deleteArticle = async data => {
    await http.delete(`/mp/articles/${data.id}`)
    loadListFunc(params)
  }
  const navigate = useNavigate()
  const goPublish = data => {
    console.log(data)
    navigate(`/publish?id=${data.id}`)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover?.images?.[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">{statusArr[data]}</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteArticle(data)}
            />
          </Space>
        )
      }
    }
  ]

  const onFinish = values => {
    console.log(values)
    const _params = {}
    values.channel_id && (_params.channel_id = values.channel_id)
    _params.channel_id = values.status
    if (values.date) {
      _params.begin_pubdate = values.date[0].format('YYYY-MM-DD')
      _params.end_pubdate = values.date[1].format('YYYY-MM-DD')
    }
    setParams({ ...params, ..._params })
  }
  const pageChange = page => {
    setParams({
      ...params,
      page: page
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: undefined }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {
                channelStore.channelList.map(channel => {
                  return <Option value={channel.id} key={channel.id}>{channel.name}</Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${list.count} 条结果：`}>
        <Table
          pagination={{
            pageSize: params.per_page,
            total: list.count,
            onChange: pageChange
          }}
          rowKey="id"
          columns={columns}
          dataSource={list.list} />
      </Card>
    </div>
  )
}

export default observer(Article)