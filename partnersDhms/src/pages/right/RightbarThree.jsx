import './rightbarThree.css';
import StarRateIcon from '@mui/icons-material/StarRate';

export default function RightbarThree() {
  return (
    <div className='task-compl'>
      <div className="comtempt">
        <div className="task">Latest task completion</div>
        <span className='see-all'>see all</span>
      </div>
      <div className="content">
        <div className="task-item">
          <div className="task-comp">
            <div className="task-label">Task</div>
            <div className="task-value">Screen Replacement</div>
          </div>
          <div className="task-comp">
            <div className="task-label">Student</div>
            <div className="task-value">Augustine Solomon</div>
          </div>
          <div className="task-comp">
            <div className="task-label">School</div>
            <div className="task-value">FUTO</div>
          </div>
          <div className="task-comp">
            <div className="task-label">Date</div>
            <div className="task-value">July 30, 2024</div>
          </div>
          <div className="task-comp rating">
            <div className="task-label">Rating</div>
            <div className="rating-stars">
              <StarRateIcon className='star' />
              <StarRateIcon className='star' />
              <StarRateIcon className='star' />
              <StarRateIcon className='star' />
              <StarRateIcon className='star gray' />
              <span className='starNum'>4.5/5.0</span>
            </div>
          </div>
        </div>

        {/* Additional task item */}
        <div className="task-item">
          <div className="task-comp">
            <div className="task-label">Task</div>
            <div className="task-value">Battery Replacement</div>
          </div>
          <div className="task-comp">
            <div className="task-label">Student</div>
            <div className="task-value">Michael Johnson</div>
          </div>
          <div className="task-comp">
            <div className="task-label">School</div>
            <div className="task-value">UNN</div>
          </div>
          <div className="task-comp">
            <div className="task-label">Date</div>
            <div className="task-value">August 12, 2024</div>
          </div>
          <div className="task-comp rating">
            <div className="task-label">Rating</div>
            <div className="rating-stars">
              <StarRateIcon className='star' />
              <StarRateIcon className='star' />
              <StarRateIcon className='star' />
              <StarRateIcon className='star gray' />
              <StarRateIcon className='star gray' />
              <span className='starNum'>3.0/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
