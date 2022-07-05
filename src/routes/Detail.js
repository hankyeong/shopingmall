import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';

let YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg == 'blue'? 'white' : 'black'};
    padding : 10px;
`
let Box = styled.div`
    background : grey;
    padding : 20px;
`
let NewBtn = styled.button(YellowBtn);


function Detail(props){

    let {stock} = useContext(Context1);

    let {id} = useParams(); // 유저가 URL 입력한거 가져오는것
    //let shoes = props.shoes.find(function(x) {
    //   return x.id == id
    //});
    let [alert, setAlert] = useState(true);
    let [count, setCount] = useState(0);
    let [tab, setTab] = useState(0);


    // mount, update시 실행됨.
    useEffect(() => {
        let a = setTimeout( ()=> {setAlert(false) }, 2000)
        return () => {
            clearTimeout(a)
        }
    }, [])
    

    return (
        <div className='container'>
            {
                alert == true
                ? <div className='alert alert-warning'>
                    2초이내 구매시 할인
                </div>
                : null
            }

            <Box>
                <YellowBtn bg="blue">버튼 </YellowBtn>
                <YellowBtn bg="orange">버튼 </YellowBtn>
            </Box>
            
            <div className='row'>
                <div className='col-md-6'>
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}원</p>
                    <div className='col-md-12'>
                        <button onClick={() => { setCount(count+1) }}>+</button>
                            {count} 
                        <button onClick={() => {  setCount(count-1) }}>-</button>
                    </div>
                        <div className='col-md-12'>
                    <button className='btn btn-danger'>주문하기</button>
                    </div>
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(0)} }  eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(1)} } eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(2)} }  eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <TabContent shoes={props.shoes}tab={tab} />

        </div>
    )
}
function TabContent({tab, shoes}) {
    
    let [fade, setFade] = useState('')
    let {stock} = useContext(Context1)

    useEffect(() => {
        let a = setTimeout(()=> { setFade('end') }, 200)
        return () => {
            clearTimeout(a)
            setFade('') // useEffect 전에 실행됨!
        }
     }, [tab])          // <- tab이라는게 변경 될 때마다, 안의 코드를 실행해줌

    return ( 
        <div className={`start ${fade}`}>
            { [<div>{stock}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][tab] }
        </div>
    )
}


export default Detail;