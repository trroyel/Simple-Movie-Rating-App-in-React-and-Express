import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu, Item } = Menu;

const menuItems = (props) => {
    
    //store props data to different constant
    const { ikey, itemData, itype, children, ...other } = props;

    const MenuData = itemData.map(cat => {
        return (<Item key={cat._id} onClick={()=> alert('clicked from '+ cat.name)}> {cat.name}</Item>)
    });

    return (
        <SubMenu key={ikey} title={<span><Icon type={itype} />{children}</span>} {...other}>
            {MenuData}
        </SubMenu>
    )
};

export default menuItems;