import React from 'react';
import { Layout, Breadcrumb, List, Card } from 'antd';
const { Content } = Layout;
const { Meta } = Card;


const content = (props) => (
    
    <Layout style={{ padding: '0 24px 24px' }}>
    
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={props.contentData}
                renderItem={item => (
                    <List.Item>

                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src={item.image} />}
                        >
                            <Meta
                                title={item.title}
                                description={item.description}
                            />
                        </Card>
                    </List.Item>
                )}
            />

        </Content>
    </Layout>
);

export default content;