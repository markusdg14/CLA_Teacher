import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function Header({title, user_data}){
    var base = new Base()

    const [greeting, set_greeting] = useState('')

    useEffect(()=>{
        var currentTime = base.moment().format('HH')
        if (currentTime >= 5 && currentTime < 12){
            set_greeting("Good Morning")
        } else if (currentTime >= 12 && currentTime < 15){
            set_greeting("Good Afternoon")
        }   else if (currentTime >= 15 && currentTime < 20){
            set_greeting("Good Evening")
        } else if (currentTime >= 20 && currentTime < 5){
            set_greeting("Good Night")
        }
    })

    return(
        <>
            <div className='row'>
                {/* <div className='col-auto d-flex align-items-center'>
                    <img src={user_data.image.image_display} style={{height : '6.75rem', width : '6.75rem', aspectRatio : 1, borderRadius : '6.75rem'}} />
                </div> */}
                <div className='col-auto d-flex align-items-center'>
						<img className='headerProfileImg' src={user_data.image.image_display} />
				</div>
                <div className='col d-flex align-items-center p-0 p-lg-2'>
					<div className='row headerSection'>
                        <div className='col-12'>
					        <h6 className='m-0 text-primary text-uppercase' style={{fontFamily : 'InterBold'}}>{greeting},</h6>
                        </div>
                        <div className='col-12'>
						    <h2 className='m-0 mt-1 text-capitalize headerName' style={{fontFamily : 'PlayfairDisplayBold'}}>{user_data.name}</h2>
                        </div>
                        <div className='col-12 mt-1'>
                            <div className='row m-0'>
                                <div className='col-auto bg-secondary' style={{borderRadius : '5rem'}}>
						            <p className='m-0 text-uppercase text-white headerDateTime' style={{fontFamily : 'PoetsenOne'}}>{base.moment().format('dddd, DD MMMM YYYY')}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='bg-secondary px-3 py-1 rounded'>
                        </div> */}
					</div>
				</div>
                {/* <div className='col d-flex align-items-center'>
                    <div>
                        <h5 className='m-0 text-primary text-uppercase'>{greeting}</h5>
                        <h2 className='m-0 mt-1 text-capitalize' style={{fontFamily : 'PlayfairDisplayBold'}}>{user_data.name}</h2>
                        <p className='m-0 mt-1 text-uppercase'>{base.moment().format('dddd, DD MMMM YYYY')}</p>
                    </div>
                </div> */}
                <div className='col-auto mt-3 mt-lg-0'>
                    <div className="card rounded shadow-sm">
                        <div className={"card-body p-3" + (title !== 'dashboard' ? ' pr-5' : '')}>
                            <div className={'row' + (title !== 'dashboard' ? ' m-0' : '')}>
                                {
                                    title === 'dashboard' ? 
                                    <div className='col-12 pr-5 pl-4 py-3'>
                                        <div className='row'>
                                            <div className='col-auto d-flex align-items-center'>
                                                <img src={base.img_trophy} style={{height : '6rem'}} />
                                                {/* <div className="ratio-11" style={{width : 96, height : '100%', backgroundSize : 'contain', backgroundRepeat : 'no-repeat', backgroundImage : "url(" + base.img_trophy +")"}} ></div> */}
                                            </div>
                                            <div className='col d-flex align-items-center justify-content-center'>
                                                <div>
                                                    <p className='m-0 text-secondary' style={{fontWeight : 700}}>Congratulations! You’re getting</p>
                                                    <h3 className='m-0 font-weight-bold'>10 Awards</h3>
                                                    <button className='btn btn-sm btn-primary mt-2 w-75' style={{borderRadius : '.5rem'}}>View Rewards</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                    <div className='col-12 pl-4 pr-5 py-3'>
                                        <p className='m-0 text-secondary' style={{fontWeight : 700}}>You’re Currently in</p>
                                        <h3 className='m-0 text-capitalize'>{title}</h3>
                                    </div>
                                    </>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}