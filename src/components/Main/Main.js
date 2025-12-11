import { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios'

const Main = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/credits')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const [searchClientId, setSearchClientId] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [filteredApplications, setFilteredApplications] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleCombinedFilter = async () => {
        setLoading(true);
        try {
            const params = {
                ClientID: searchClientId,
                Status: searchStatus,
                Branch: searchBranch,
                StartDate: searchStartDate,
                EndDate: searchEndDate
            };
            const response = await axios.get(`/credits/?ClientID=${params.ClientID}&Status=${params.Status}&Branch=${params.Branch}&StartDate=${params.StartDate}&EndDate=${params.EndDate}`);
            setFilteredApplications(response.data);


            console.log(response.data);

        } catch (error) {
            console.log('Search error:', error);
            setFilteredApplications([]);
        } finally {
            setLoading(false);
        }
    };

    console.log(searchStartDate);

    return (
        <main>
            <div className='container'>
                <div>
                    <div className="form-group">
                        <label className="form-label">Ըստ հաճախորդի</label>

                        <input
                            className="form-input"
                            type="text"
                            placeholder="Enter Client ID"
                            value={searchClientId}
                            onChange={(e) => setSearchClientId(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className='label_all'> Ստեղծման ամսաթվի</label>
                    <input
                        type="date"
                        className='inp_client-id search-input inp_client-date'
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                    />

                </div>
                <div>
                    <label className='label_all'>Ավարտի ամսաթվի</label>
                    <input
                        type="date"
                        className='inp_client-id search-input inp_client-date'
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label_all'> Ըստ մասնաճյուղի</label>
                    <select
                        className='inp_client-id search-input inp_branch'
                        value={searchBranch}
                        onChange={(e) => setSearchBranch(e.target.value)}
                    >
                        <option value="">Select Branch</option>
                        <option value="Արմավիր">Արմավիր</option>
                        <option value="Երևան Մալաթիա">Երևան Մալաթիա</option>
                        <option value="Երևան Կենտրոն">Երևան Կենտրոն</option>
                        <option value="Գյումրի">Գյումրի</option>
                        <option value="Էջմիածին">Էջմիածին</option>
                        <option value="Արմավիր">Արմավիր</option>
                        <option value="Վանաձոր">Վանաձոր</option>
                        <option value="Էջմիածին">Էջմիածին</option>
                        <option value="Վանաձոր">Վանաձոր</option>
                    </select>

                </div>
                <div>
                    <label className='label_all'> Ըստ կարգավիճակի</label>
                    <select
                        className='inp_client-id search-input inp_status'
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="New">New</option>
                        <option value="In Process">In Process</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Approved">Approved</option>
                    </select>
                </div>
                <div>
                    <button
                        onClick={handleCombinedFilter}
                        disabled={loading}
                        className='search-btn'>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
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
                                <tr key={item.ClientID}>
                                    <td className='border_all'>{item.ClientID}</td>
                                    <td className='border_all'>{item.ApplicationID}</td>
                                    <td className='border_all'>{item.ClientID}</td>
                                    <td className='border_all'>{item.Branch}</td>
                                    <td className='border_all'>{item.Product}</td>
                                    <td className='border_all'>{item.Status}</td>
                                    <td className='border_all'>{item.ApplicationDate ? item.ApplicationDate.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.FinalDecisionDate ? item.FinalDecisionDate.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase1_Start ? item.Phase1_Start.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase1_End ? item.Phase1_End.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase2_Start ? item.Phase2_Start.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase2_End ? item.Phase2_End.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase3_Start ? item.Phase3_Start.split('T')[0] : ''}</td>
                                    <td className='border_all'>{item.Phase3_End ? item.Phase3_End.split('T')[0] : ''}</td>
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