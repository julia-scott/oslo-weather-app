import React from "react";
import { Card } from 'react-bootstrap';

export default function CardComponent(props) {
    return (
        <>
            <Card className="dateCard" border="dark" style={{ width: '18rem' }}>
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