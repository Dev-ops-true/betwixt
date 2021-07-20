import {useEffect, useState} from "react";
import {Circle} from "@react-google-maps/api";

export default function CircleComponent(props) {


    const [midPoint, setMidPoint] = useState(props.midPoint)
    const [radius, setRadius] = useState(props.radius)

    useEffect(() => {
        setMidPoint(props.midPoint)
        setRadius(props.radius)
    })

    return (
        midPoint !== null && <Circle
            center={{
                lat: midPoint.lat(),
                lng: midPoint.lng()
            }}
            radius={radius}
        />

    )


} 