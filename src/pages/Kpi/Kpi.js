import './kpi.css';
import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DEFAULT_COUNTS = {
    Canceled: 0,
    New: 0,
    'In Process': 0,
    Rejected: 0,
    Approved: 0,
};

const KEYS = ['Canceled', 'New', 'In Process', 'Rejected', 'Approved'];

const Kpi = () => {
    const [status, setStatus] = useState([]);

    useEffect(() => {
        axios.get('/kpi/status')
            .then((res) => {
                setStatus(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const [displayValues, setDisplayValues] = useState(DEFAULT_COUNTS);
    const displayValuesRef = useRef(displayValues);

    useEffect(() => { displayValuesRef.current = displayValues; }, [displayValues]);

    useEffect(() => {
        const targets = (status && Object.keys(status).length) ? status : DEFAULT_COUNTS;
        const duration = 900;
        const startValues = { ...displayValuesRef.current };
        const startTime = performance.now();
        let rafId = null;

        function step(now) {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const next = {};
            KEYS.forEach((k) => {
                const s = Number(startValues[k] ?? 0);
                const e = Number(targets[k] ?? 0);
                next[k] = Math.round(s + (e - s) * eased);
            });
            setDisplayValues(next);
            if (t < 1) rafId = requestAnimationFrame(step);
        }

        rafId = requestAnimationFrame(step);
        return () => { if (rafId) cancelAnimationFrame(rafId); };
    }, [status]);
    // Branch KPIs
    const [branch, setBranch] = useState({});
    useEffect(() => {
        axios.get('/kpi/branch')
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    const map = {};
                    data.forEach((item) => {
                        if (item && (item.branch || item.branch === 0)) {
                            map[item.branch] = Number(item.count ?? 0);
                        }
                    });
                    setBranch(map);
                } else {
                    setBranch(data || {});
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const [displayBranchValues, setDisplayBranchValues] = useState({});
    useEffect(() => {
        if (!branch || !Object.keys(branch).length) return;
        const targets = branch;
        const keys = Object.keys(targets);
        const duration = 900;
        const startTime = performance.now();

        function step(now) {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const next = {};
            keys.forEach((k) => {
                const s = 0;
                const e = Number(targets[k] ?? 0);
                next[k] = Math.round(s + (e - s) * eased);
            });
            setDisplayBranchValues(next);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }, [branch]);

    const defaultBranchList = [
        'Երևան Կենտրոն',
        'Վանաձոր',
        'Արմավիր',
        'Գյումրի',
        'Էջմիածին',
        'Երևան Մալաթիա',
    ];

    const branchToRender = (displayBranchValues && Object.keys(displayBranchValues).length)
        ? displayBranchValues
        : defaultBranchList.reduce((acc, b) => { acc[b] = 0; return acc; }, {});

    return (
        <div className='kpi_wrapper'>
            <div className='container'>
                <div className='kpi_title-wrapper'>
                    <h1 className='kpi_title'>KPI արժեքներ </h1>
                </div>
                <div className='kpi_content-wrapper'>
                    {KEYS.map((key) => (
                        <div className='kpi_card' key={key}>
                            <div className='kpi_card-title'>{key}</div>
                            <div className='kpi_card-value'>{displayValues[key]}</div>
                        </div>
                    ))}
                </div>
                <div className='kpi_section-title'>Ըստ մասնաճյուղի</div>
                <div className='kpi_content-wrapper'>
                    {Object.entries(branchToRender).map(([branchName, val]) => (
                        <div className='kpi_card' key={branchName}>
                            <div className='kpi_card-title'>{branchName}</div>
                            <div className='kpi_card-value'>{val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Kpi;