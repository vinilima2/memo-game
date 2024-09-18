import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button } from "react-bootstrap";

const Cronometro = forwardRef(function Cronometro(props, ref) {
    const [segundos, setSegundos] = useState(null)
    const [intervalo, setIntervalo] = useState(null)

    useEffect(() => {
        if (segundos <= 0) {
            clearInterval(intervalo)
        }
    }, [segundos])

    useImperativeHandle(ref, () => ({
        iniciarCronometro,
        pararCronometro,
        getTempoRestante
    }))


    function iniciarCronometro(s) {
        setSegundos(s)
        const interval = setInterval(() => {
            setSegundos(s => s - 1)
        }, 1000)
        setIntervalo(interval)
    }

    function pararCronometro() {
        clearInterval(intervalo)
        return segundos;
    }

    function getTempoRestante() {
        return segundos;
    }

    const getButtonClass = () => {
        if (segundos <= 5 && segundos > 0) {
            return "bg-danger pulse";
        }
        return "bg-primary";
    };

    return (
        <Button
            size="lg"
            className={`m-2 ${getButtonClass()}`}
            style={{
                display: segundos == null ? 'none' : 'initial',
                border: 'none',
            }}
        >
            <i className='bi bi-stopwatch'></i> {segundos?.toString().padStart(2, "0")}
        </Button>
    );
})
export default Cronometro;