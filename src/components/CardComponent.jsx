import React from "react";
import { Card } from 'react-bootstrap';

export default function CardComponent(props) {
    return (
        <>
            <Card border="dark" style={{ width: '18rem' }} className="text-center">
                <Card.Header>{props.date}</Card.Header>
                <Card.Body>
                    <img src={`https://openweathermap.org/img/wn/${props.image}@2x.png`} alt="weather"/>
                    <Card.Title>
                        {Math.round(props.temp)}&deg;C
                    </Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">{props.desc}</Card.Footer>
            </Card>
        </>
    );
}