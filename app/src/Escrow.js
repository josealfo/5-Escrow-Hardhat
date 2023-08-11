import { ethers } from 'ethers';

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  isApproved,
  handleApprove,
}) {
  let approvedContainer = <div className="complete">✓ It has been approved!</div>;
  if (isApproved) {  
    return (
      <div className="existing-contract">
        <ul className="fields">
          <li>
            <div> Address </div>
            <div> {address} </div>
          </li>
          <li>
            <div> Arbiter </div>
            <div> {arbiter} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> {beneficiary} </div>
          </li>
          <li>
            <div> Value  </div>
            <div> {ethers.utils.formatEther(value)}Eth</div> <div>({value}Wei)</div>
          </li>
          <li>
            <div className="complete">✓ It has been approved!</div>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="existing-contract">
        <ul className="fields">
          <li>
            <div> Address </div>
            <div> {address} </div>
          </li>
          <li>
            <div> Arbiter </div>
            <div> {arbiter} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> {beneficiary} </div>
          </li>
          <li>
            <div> Value  </div>
            <div> {ethers.utils.formatEther(value)}Eth</div> <div>({value}Wei)</div>
          </li>
          <li> <div className="button" 
                                id={address}
                                onClick={(e) => {
                                e.preventDefault();
                                handleApprove();
                              }}
                            >
                            Approve
                          </div>
          </li>
        </ul>
      </div>
    );
  }

/* 
//  '<div className="button" id={address}
//                              onClick={(e) => {
                                e.preventDefault();
                                handleApprove();
                              }}
                            >
                            Approve
                          </div>}
        <li>
          <div> isApproved  </div>
          <div>{isApproved ? 'Yes': 'No'}</div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>

*/

}