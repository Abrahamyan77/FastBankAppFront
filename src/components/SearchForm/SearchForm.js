import './searchForm.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

const SearchForm = ({ filteredApplications, setFilteredApplications }) => {
    const [clients, setClients] = useState([])
    useEffect(() => {
        axios.get('/clients')
            .then((res) => {
                setClients(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const [searchClientId, setSearchClientId] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");

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
        } catch (error) {
            setFilteredApplications([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='form_wrapper'>
            <div className='form_header'>
                <h2 className='search-form-title'>Վարկային հոսքագծի տվյալների բազա </h2>
            </div>
            <div className="form-group">
                <div>
                    <label className="form-label">Ըստ հաճախորդի</label>
                    <select
                        className="form-input"
                        value={searchClientId}
                        onChange={(e) => setSearchClientId(e.target.value)}
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client} value={client}>
                                {client}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='form-label label_all'> Ըստ մասնաճյուղի</label>
                    <select
                        className='form-input inp_client-id search-input inp_branch'
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
                    <label className='form-label label_all'> Ըստ կարգավիճակի</label>
                    <select
                        className='form-input inp_client-id search-input inp_status'
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
                    <label className='form-label label_all'> Ստեղծման ամսաթվի</label>
                    <input
                        type="date"
                        className='form-input inp_client-id search-input inp_client-date'
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className='form-label label_all'>Ավարտի ամսաթվա</label>
                    <input
                        type="date"
                        className='form-input inp_client-id search-input inp_client-date'
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    onClick={handleCombinedFilter}
                    disabled={loading}
                    className='search-btn'>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </div>
    );
}
export default SearchForm;