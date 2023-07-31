import React from 'react'; 
import Spinner from '../Spinner/Spinner';
import "../../assets/styles/SocialStyle.css";
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { EmojiSmile, Send } from 'react-bootstrap-icons';

function Comment({ placeholder, submitFn, setInputValue, comment, emojiPickerStatus, setEmojiPickerStatus }) {
    const dispatch = useDispatch();

    const state = useSelector(state => { return state });
    const { primaryColor } = state.themeStyle;
    const { spinner, error } = state;

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    };

    const updateEmojiPickerStatus = () => {
        if (emojiPickerStatus === 'd-none') setEmojiPickerStatus(`d-block`);
        else setEmojiPickerStatus('d-none');
    }

    const handleEmojiSelect = emoji => setInputValue(prevState => prevState + "" + emoji.emoji);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center align-items center commentbody">
                        <div className={`emojiBody ${emojiPickerStatus}`}>
                            <EmojiPicker
                                lazyLoadEmojis={true}
                                skinTonesDisabled={true}
                                onEmojiClick={handleEmojiSelect}
                            />
                        </div>
                        <button className="emojiButton mx-2" onClick={updateEmojiPickerStatus}>
                            <EmojiSmile className='mx-2 my-2' size='20px' style={{ color: primaryColor }} />
                        </button>
                        <form action="" className='w-100' onSubmit={submitFn}>
                            <input
                                type="text"
                                value={comment}
                                placeholder={placeholder}
                                className='commentInputBox px-3 py-1 w-75'
                                onChange={e => {
                                    errorHandler(false);
                                    setInputValue(e.target.value);
                                }}
                                style={{ background: "inherit", color: primaryColor }}
                            />
                            {
                                spinner ?
                                    <button className={`leaveCommentButton px-3 py-2 mx-2 h-100 rounded disabled`} disabled>
                                        <Spinner size='21px' />
                                    </button>
                                    :
                                    <button className={`leaveCommentButton px-3 py-2 mx-2 h-100 rounded `}>
                                        <Send />
                                    </button>
                            }
                        </form>
                    </div>
                    <div className="text-center">
                        <small className="text-danger text-center">{error}</small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment