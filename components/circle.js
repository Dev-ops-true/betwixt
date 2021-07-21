import {useEffect, useState} from "react";
import {Circle} from "@react-google-maps/api";

export default function CircleComponent(props) {

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#9FE2BF',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 1500,
        zIndex: 1
      }

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
            options={options}
        />

    )


} 