import { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios'

const Main = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/demoDB')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const [searchClientId, setSearchClientId] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [filteredApplications, setFilteredApplications] = useState(data);
    const [searchStatus, setSearchStatus] = useState("");

    // All Searches 

    const handleCombinedFilter = () => {
        let filtered = data;

        if (searchClientId.trim() !== "") {
            filtered = filtered.filter(app =>
                app.clientid.toLowerCase().includes(searchClientId.toLowerCase())
            );
        }

        if (searchDate.trim() !== "") {
            filtered = filtered.filter(app => {
                const appDate = app.applicationdate.slice(0, 10);
                return appDate.includes(searchDate);
            });
        }

        if (searchBranch.trim() !== "") {
            filtered = filtered.filter(app =>
                app.branch.toLowerCase().includes(searchBranch.toLowerCase())
            );
        }

        if (searchStatus.trim() !== "") {
            filtered = filtered.filter(app =>
                app.status.toLowerCase().includes(searchStatus.toLowerCase())
            );
        }

        setFilteredApplications(filtered);
    };


    return (
        <main>
            <div className='container'>
                <div>
                    <label className='label_all'> Ըստ հաճախորդի</label>
                    <input
                        className='inp_client-id search-input'
                        type="text"
                        placeholder="Enter Client ID"
                        value={searchClientId}
                        onChange={(e) => setSearchClientId(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label_all'> Ըստ ամսաթվի</label>
                    <input
                        type="date"
                        className='inp_client-id search-input inp_client-date'
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />

                </div>
                <div>
                    <label className='label_all'> Ըստ մասնաճյուղի</label>
                    <input
                        type="text"
                        placeholder="Enter Branch"
                        className='inp_client-id search-input inp_branch'
                        value={searchBranch}
                        onChange={(e) => setSearchBranch(e.target.value)}
                    />

                </div>
                <div>
                    <label className='label_all'> Ըստ կարգավիճակի</label>
                    <input
                    className='inp_client-id search-input inp_status'
                        type="text"
                        placeholder="Status"
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleCombinedFilter} className='search-btn'>Search</button>
                </div>
                {

                    <table className='table_wrapper'>
                        <thead className='tbody_wrapper' >
                            <tr >
                                <th className='border_all'>ID</th>
                                <th className='border_all'>Application ID</th>
                                <th className='border_all'>Client ID</th>
                                <th className='border_all'>Branch</th>
                                <th className='border_all'>Product</th>
                                <th className='border_all'>Status</th>
                                <th className='border_all'>Application Date</th>
                                <th className='border_all'>Final Decision Date</th>
                                <th className='border_all'>Phase1 Start</th>
                                <th className='border_all'>Phase1 End</th>
                                <th className='border_all'>Phase2 Start</th>
                                <th className='border_all'>Phase2 End</th>
                                <th className='border_all'>Phase3 Start</th>
                                <th className='border_all'>Phase3 End</th>
                            </tr>
                        </thead>

                        <tbody className='tbody_wrapper'>
                            {filteredApplications.map((item) => (
                                <tr key={item.id}>
                                    <td className='border_all'>{item.id}</td>
                                    <td className='border_all'>{item.applicationid}</td>
                                    <td className='border_all'>{item.clientid}</td>
                                    <td className='border_all'>{item.branch}</td>
                                    <td className='border_all'>{item.product}</td>
                                    <td className='border_all'>{item.status}</td>
                                    <td className='border_all'>{item.applicationdate.split("T")[0]}</td>
                                    <td className='border_all'>{item.finaldecisiondate}</td>
                                    <td className='border_all'>{item.phase1_start}</td>
                                    <td className='border_all'>{item.phase1_end}</td>
                                    <td className='border_all'>{item.phase2_start}</td>
                                    <td className='border_all'>{item.phase2_end}</td>
                                    <td className='border_all'>{item.phase3_start}</td>
                                    <td className='border_all'>{item.phase3_end}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </main>
    )
}

export default Main;