import { useMemo, useState } from "react";
import { Fade } from "react-bootstrap";


export default function Logo() {
    const [indice, setIndice] = useState(0)
    const icones = [
        { icone: 'bi-question-square-fill', cor: 'orange' },
        { icone: 'bi-question-octagon-fill', cor: 'yellow' },
        { icone: 'bi-question-diamond-fill', cor: 'green' },
        { icone: 'bi-question-circle-fill', cor: 'lightblue' },
        { icone: 'bi-patch-question-fill', cor: 'orange' },
    ]

    useMemo(() => {
        setInterval(() => {
            setIndice((i) => {
                if (i + 1 > icones.length - 1) return 0
                else return i + 1
            })
        }, 2500)
    }, [])

    return (
        <i className={icones[indice].icone} style={{ fontSize: 150, color: icones[indice].cor }} />
    );
}