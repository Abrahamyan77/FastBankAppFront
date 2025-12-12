import { useState } from 'react';
import './home.css';
import SearchForm from '../../components/SearchForm/SearchForm';

const Home = () => {
  const [filteredApplications, setFilteredApplications] = useState([]);

    return (
        <main>
            <div className='container'>
                <SearchForm  filteredApplications={filteredApplications} setFilteredApplications={setFilteredApplications} />
                {
                    <table className='table_wrapper'>
                        <thead className='tbody_wrapper' >
                            <tr >
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

export default Home;