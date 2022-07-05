import { useState } from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { addCount } from './../store.js';


function Cart() {
    let state = useSelector((state)=> state ) // useState와 비슷함
    let disptch = useDispatch()     // store.js에 있는 변경함수들을 쓸수 있게 해주는것

    return (
        <div>
            {state.user.name} {state.user.age}의 장바구니
            <button onClick={() => { disptch(increase(100)) }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i)=>
                        <tr key={i}>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].name}</td>
                            <td>{state.cart[i].count}</td>
                            <td>
                                <button onClick={()=> {
                                    disptch(addCount(state.cart[i].id))
                                }}>+</button>
                            </td>
                        </tr>
                        )
                    }
                </tbody> 
            </Table> 
        </div>
    )
}

export default Cart;