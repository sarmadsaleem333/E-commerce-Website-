import React from 'react'

export default function Slides(props) {
    return (
        <div id="carouselExampleControls" className="carousel slide my-3" data-bs-ride="carousel" >
            <div className="carousel-inner "style={{height:"450px"}}>
                <div className="carousel-item active">
                    <img src={props.link1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={props.link2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={props.link3} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
