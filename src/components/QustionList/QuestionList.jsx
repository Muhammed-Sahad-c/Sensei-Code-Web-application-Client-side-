import { v4 as uuidv4 } from 'uuid';
import convertTime from 'convert-time';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LIsts from '../Placeholders/LIsts';
import React, { useEffect, useState } from 'react';
import { Chat, TriangleFill } from 'react-bootstrap-icons';
import { getAllQuestions } from '../../services/QAsessionServices';

function QustionList() {
 
  const [questions, setQuestions] = useState([]);
  const state = useSelector(state => { return state });

  const { primaryColor, secondaryBackground } = state.themeStyle;
  const style3 = { background: secondaryBackground, color: primaryColor };

  useEffect(() => {
    getAllQuestions().then(response => {
      if (response.data.status === true) setQuestions(response.data.questions);
    })
  }, []);

  return (
    <div>
      <div className="py-5 px-3">
        <div className="row">
          {/* <h3 className='text-start pb-2 text-decoration-underline'>Recently Asked Qustions</h3> */}
          {
            questions.length ? questions.map(item => {
              return (
                <div className="col-12 py-2 mb-2 questionBody" key={uuidv4()} style={style3}>
                  <div className='pb-1'>
                    {
                      state.user.email === item.userMail ?
                        <small className='fw-lighter' style={{ color: primaryColor, opacity: .5 }}> you</small>
                        :
                        <Link to={`/usersprofile/${item.userMail}`} className='text-decoration-none'>
                          <small> {item.userName.toLowerCase()} </small>
                        </Link>
                    }
                    <small className='time px-3 '>{`  Asked ${item.time[1]} ${item.time[2]} ${item.time[3]} At ${convertTime(item.time[4])}`} </small>
                  </div>
                  <Link to={`/view question/${item.questionId}`} className='text-decoration-none fw-light'>
                    <p className="question text-uppercase fw-light">
                      {item.question}
                    </p>
                  </Link>
                  <div className='pt-1 pb-2'>
                    {
                      item.questionTags.map(tag => (
                        <span className='border-1 border-info px-2 py-1 mx-2 rounded' style={{ border: "1px solid green" }}>
                          <small>{tag}</small>
                        </span>
                      ))
                    }
                  </div>
                  <div className=" py-3 d-flex ">
                    <div className=''>
                      <TriangleFill size='10px' color="red" />
                      <small className='px-1 socialText'>{item.votesCount}</small>
                    </div>
                    <div className='px-2'>
                      <Chat size='12px' color="blue" />
                      <small className='px-1 socialText'>{"                  " + item.comments}</small>
                    </div>
                    {
                      item.acceptedAnswer === "" ?
                        <small className='answerCount fw-medium'>{item.answersCount} answers</small>
                        :
                        <small className='answerCountactive fw-medium border-0 rounded px-2 py-1 bg-success'>{item.answersCount} answers</small>
                    }
                  </div>
                </div>
              )
            }) :
              <div>
                <LIsts />
                <LIsts />
                <LIsts />
                <LIsts />
                <LIsts />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default QustionList