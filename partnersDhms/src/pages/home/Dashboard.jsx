import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Users from '../../components/user/Users';
import './dashboard.css';


export default function Dashboard() {
  return (
    <div className='home' >
        <FeaturedInfo />
        <Chart />
        <div className="homeWidgets">
          <Users />
        </div>
    </div>
  )
}
