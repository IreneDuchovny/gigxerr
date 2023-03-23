import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/user.actions";




export function UserDropDownModal({openUserDropDown,setOpenUserDropDown}) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()
    async function onLogout() {
        try {
            navigate("/");
          await logout();
         showSuccessMsg(`See you soon!`);
         
          
        } catch (err) {
         showErrorMsg("Cannot logout");
   
        }
      }

    return (
        <div>
        {( user && openUserDropDown) &&
        <div className="user-modal flex">
        <div className="modal-tip"></div>
        <a href={`/user/${user._id}`} className="light">Profile</a>
        <a href={`/user/${user._id}`} className="">Dashboard</a><a onClick={() => {onLogout()}}>Logout</a>
        </div>
        }
        </div>
    )
}   
