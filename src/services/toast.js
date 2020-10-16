import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const toastMessage = (message, type = 'success') => {
    toast.configure()
    if(type === 'success'){
        toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    } else if (type === 'error'){
        toast.warning(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
}

export default toastMessage;