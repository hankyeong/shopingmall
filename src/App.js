import { Button, Container, Navbar, Nav} from 'react-bootstrap';
import dress from './옷1.jpg';
import './App.css';
import { createContext, useState } from 'react';
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/Detail'
import axios from 'axios';
import Cart from './routes/Cart.js'

export let Context1 = createContext() // Context는 state의 보관함.

function App() {

let [shoes, setShoes] = useState(data);
let [stock, setStock] = useState([10, 11, 12]); // 재고
let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">한경's Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') } }>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/detail') } }>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <Routes>
        <Route path="/" element={ 
          <>
            <div className='container'>
            <div className='row'>
              {/* <Card shoes={shoes[0]} i={1} />
              <Card shoes={shoes[1]} i={2} /> */}
              {
                shoes.map((a, i) => {
                  return (
                    <Card shoes={shoes[i]} i={i+1} key={i} />
                  )
                })
              }
            </div>
          </div>
          <button onClick={() => {
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              console.log(result.data)
              let copy = [...shoes, ...result.data];
              setShoes(copy)
            })
            
          }}>더보기</button>
          </> 
        } />
        
        <Route path="/detail/:id" element={ 
          <Context1.Provider value= {{ stock, shoes }}>
            <Detail shoes={shoes} /> 
          </Context1.Provider>
        } />

        <Route path="/cart" element={ <Cart/> } />

        <Route path="*" element={ <div>없는 페이지에여</div> } />

        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>멤버임</div> } />
          <Route path="location"element={ <div>위치정보임</div> }  /> 
        </Route>

      </Routes>
        
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Card(props){
  return (
  <div className='col-md-4'>
    <img src ={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.price}</p>
  </div>
  )
}




export default App;
