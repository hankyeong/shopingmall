function Detail(props){
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src="https://codingapple1.github.io/shop/shoes" width="100%" />
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{props.shoes}</h4>
                    <p>상품설명</p>
                    <p>{props.shoes.price}</p>
                    <button className='btn btn-danger'>주문하기</button>
                </div>
            </div>

        </div>
    )
}

export default Detail;