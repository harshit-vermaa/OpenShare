import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Style from './PopReview.module.css';

const CustomizedDialogs = () => {
    const PORT = process.env.PORT
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [user, setUser] = useState({});
    const [review, setReview] = useState({
        title: '',
        description: '',
        email: '',
    });
    const [file, setFile] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const userAuth = async () => {
        try {
            const res = await fetch(`${PORT}/auth`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.status === 200) {
                const data = await res.json();
                setUser(data.user);
            } else {
                navigation(`${PORT}/login`);
            }
        } catch (error) {
            console.error('Error during user authentication:', error);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return window.alert('Image is not uploaded');
        }
        if (review.title.length < 10 || review.title.length > 50) {
            return window.alert('Title limit: minimum(10) maximum(50)');
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', review.title);
        formData.append('description', review.description);
        formData.append('email', user.email);

// console.log(formData)

        try {
            const res = await fetch(`${PORT}/create-post`, {
                method: 'POST',
                body: formData,
            });

            if (res.status === 200) {
                window.alert('Review uploaded successfully');
                console.log('Review uploaded successfully');
                window.location.reload();
                handleClose();
            } else {
                window.alert("Can't upload the review");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <div>
            <Button className={Style.button} variant="outlined" onClick={handleClickOpen}>
                Share
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <div className={Style.popReview}>
                    <div className={Style.main}>
                        <form className={Style.box}>
                            <h1>Post your thoughts!!</h1>
                            <div className={Style.box_inputs}>
                                <TextField
                                    name="email"
                                    value={user.email}
                                    className={Style.input}
                                    id="standard-basic"
                                    variant="standard"
                                    disabled
                                />
                                <input type="file" name='image' onChange={handleFile} />
                                <TextField
                                    inputProps={{ maxLength: 50, minLength: 20 }}
                                    name="title"
                                    onChange={handleInput}
                                    className={Style.input}
                                    id="standard-basic"
                                    label="Enter Title"
                                    variant="standard"
                                />
                                <TextField
                                    inputProps={{ maxLength: 300, minLength: 50 }}
                                    name="description"
                                    onChange={handleInput}
                                    className={Style.input}
                                    id="standard-basic"
                                    label="Enter Description"
                                    variant="standard"
                                />
                            </div>
                            <Button className={Style.box_button} type="submit" onClick={handleSubmit} variant="outlined">
                                Post
                            </Button>
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CustomizedDialogs;























// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Style from "./PopReview.module.css"


// import TextField from '@mui/material/TextField';
// import { useNavigate } from "react-router-dom"

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// const BootstrapDialogTitle = (props) => {
//     const { children, onClose, ...other } = props;
//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

// BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
// };

// const CustomizedDialogs = () => {
//     const [open, setOpen] = useState(false);
//     const navigation = useNavigate();
//     const [user, setUser] = useState({})
//     const [token, setToken] = useState()
//     const [review, setReview] = useState({
//         title: '',
//         description: '',
//         email: ''
//     })
//     const [fileTarget, setFileTarget] = useState()

//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const userAuth = async () => {

//         const res = await fetch('/auth', {
//             method: "GET",
//             headers: {
//                 Accept: "app/json",
//                 "Content-Type": "applicaiton/json"
//             },
//             "credentials": "include"
//         })

//         const data = await res.json()

//         setUser(data.user)
//         setToken(data.token)
//         if (res.status === 200) {
//             console.log("you are authorised")

//         } else if (res.status === 400 || !res) {
//             navigation('/login')
//         }

//     }

//     const handleInput = (e) => {
//         const { name, value } = e.target
//         setReview({ ...review, [name]: value, email: user.email })
//     }

// const handleFile = (e) => {
//     const file = e.target.files[0];
//     setFileTarget(file)
// }

//     const Submit = async (e) => {
//         e.preventDefault();

//         const { title, description, email } = review
        
       
//         if (!file) {
//             return console.log('file not uploaded');
//         }
//         if (title.length <= 10 ) {
//             return window.alert(`Title limit : minimum(10) maximum(50)`)
//         }

//         const formData = new FormData();
//         formData.append('image', fileTarget);

//         const res = await fetch('/create-post', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json", 'multipart/form-data'
//             },
//             body: JSON.stringify({ title, description, email }), formData,
//         })

//         if (res.status === 200) {
//             window.alert("Review uploaded Successfully")
//             console.log("Review uploaded Successfully");
//         } else {
//             window.alert("can't upload the review")
//         }


//     }

//     useEffect(() => {
//         userAuth()
//     }, [])

//     return (
//         <div>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Share
//             </Button>
//             <BootstrapDialog
//                 onClose={handleClose}
//                 aria-labelledby="customized-dialog-title"
//                 open={open}
//             >
//                 <div className={Style.popReview}>
//                     <div className={Style.main}>
//                         <form method='POST' className={Style.box} enctype="multipart/form-data">
//                             <h1>post your thoughts !!</h1>
//                             <div className={Style.box_inputs}>
//                                 <TextField  name='email' value={user.email} className={Style.input} id="standard-basic" variant="standard" />
//                                 <input type="file" onChange={handleImage} />
//                                 <TextField inputProps={{ maxLength: 50, minlength:20 }} name='title' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter Title" variant="standard" />
//                                 <TextField inputProps={{ maxLength: 300, minlength: 50 }} name='description' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter Description" variant="standard" />
//                             </div>
//                             <Button type='submit' onClick={Submit} variant="outlined">Post</Button>
//                         </form>
//                     </div>
//                 </div>
//             </BootstrapDialog>
//         </div>
//     );
// }

// export default CustomizedDialogs;
