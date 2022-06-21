import React, { useEffect, useState } from 'react';
import Base from '../../utils/base';
import { useLocation } from 'react-router-dom'

export default function Navbar(){
	var base = new Base()
	let {pathname, search} = useLocation()

	const [header_nav_arr] = useState([
		{title : 'Dashboard', icon : '', url : '/', dropdown_arr : []},
		{title : 'Teaching', icon : '', url : '#!', dropdown_arr : [
			{title : 'Teacher Tracker', nav : '/teacher-tracker', icon : 'bi bi-pie-chart-fill'},
			{title : 'Send Announcement', nav : '/announcement', icon : 'bi bi-megaphone-fill'},
			{title : 'Subject & Lesson', nav : '/subject-lesson', icon : 'bi bi-file-earmark-bar-graph-fill'},
			{title : 'Check Assignment', nav : '/check-assignment', icon : 'bi bi-ui-checks'},
			{title : 'Calendar', nav : '/calendar', icon : 'bi bi-calendar2-week-fill'},
			{title : 'Grade Book', nav : '/grade-book', icon : 'bi bi-folder-fill'},
		]},
		{title : 'Homeroom', icon : '', url : '/homeroom', dropdown_arr : [
			// {title : 'Class & Student', nav : '', icon : 'bi bi-pie-chart-fill'},
			// {title : 'Attendance & Reward', nav : '', icon : 'bi bi-megaphone-fill'},
			// {title : 'Student Talent Bank', nav : '', icon : 'bi bi-file-earmark-bar-graph-fill'},
		]},
		{title : 'Profile', icon : '', url : '/profile', dropdown_arr : []},
		// {title : '', icon : 'bi bi-bell-fill', url : '/notification', dropdown_arr : []},
	])

	const [unread_notif, set_unread_notif] = useState(0)

	useEffect(()=>{
		get_notif_unread()
	}, [])

	function useQuery() {
		const { search } = useLocation();
		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	let query = useQuery()

	const [is_sidebar, set_is_sidebar] = useState(false)

	async function sidebar(is_open){
		// console.log(is_open)
		set_is_sidebar(is_open)
	}

	async function logout(){
		var firebaseToken = await localStorage.getItem('firebaseToken')

		var response = await base.request('/auth/logout', 'post', {token : firebaseToken})
		if(response != null){
			if(response.status == 'success'){
				localStorage.clear()
				window.location.href = '/auth/login'
			}
		}
	}

	async function get_notif_unread(){
        var url = '/notification/unread'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                set_unread_notif(response.data)
            }
        }
    }

	return(
		<>
			<nav className="navbar navbar-expand-lg navbar-dark p-0 m-0 py-3">
				<div className="container d-none d-lg-flex px-md-3">
					<a className="navbar-brand m-0" href="/"><img src={base.img_logo_text} className={'header_logo'} alt="ChristianLifeAcademy-Logo" style={{ width: '15rem' }} /></a>
					<div className="d-flex flex-column">
						<div className="collapse navbar-collapse" id="navbarResponsive" aria-labelledby="navbarResponsive">
							<ul className="navbar-nav text-uppercase ml-auto pt-3 pt-lg-0">
								{
									header_nav_arr.map((data, index) => (
										<li className={"nav-item" + (index !== 0 ? ' ml-0 ml-xl-5 ml-lg-4' : '') + (index != header_nav_arr.length-1 ? ' mr-0 mr-xl-4 mr-lg-3' : '') + (pathname === data.url ? ' nav_active' : '')} key={index}>
											{
												data.dropdown_arr.length > 0 ?
												<>
												<a className="nav-link dropdown-toggle text-primary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" style={{fontSize : '.9rem'}}>{data.title}</a>
												<div className="dropdown-menu" aria-labelledby="navbarDropdown">
													{
														data.dropdown_arr.map((dataDropdown, indexDropdown)=>(
															<a className={"dropdown-item" + (pathname === dataDropdown.nav ? ' bg-secondary text-white' : '')} href={dataDropdown.nav} key={indexDropdown} style={{fontSize : '.9rem'}}><i className={dataDropdown.icon + ' mr-3' + (pathname === dataDropdown.nav ? ' text-white' : '')} style={{color : '#767676'}}></i>{dataDropdown.title}</a>
														))
													}
												</div>
												</>
												:
												<a className="nav-link js-scroll-trigger text-primary" href={data.url} style={{ fontSize: '.9rem' }}>
													{
														data.icon != '' &&
														<h5><i className={data.icon}></i></h5>
													}
													{data.title}
												</a>
											}
										</li>
									))
								}
								<li className={"nav-item ml-0 ml-xl-5 ml-lg-4" + (pathname === '/notif' ? ' nav_active' : '')}>
									<a className="nav-link js-scroll-trigger text-primary position-relative" href='/notification' style={{ fontSize: '.9rem' }}>
										{
											unread_notif > 0 &&
											<i className="bi bi-circle-fill position-absolute" style={{ fontSize: '.5rem', color : 'red', right : '.5rem', top : '.5rem' }}></i>
										}
										<i className="bi bi-bell-fill text-primary" style={{ fontSize: '1rem' }}></i>
									</a>
								</li>
							</ul>
						</div>                        
					</div>
				</div>

				<div className='d-flex justify-content-between d-lg-none m-0 w-100 mt-2 mx-4'>
					<div className="d-flex align-items-center">
						<a className="navbar-brand m-0" href="/"><img src={base.img_logo_text} className={'header_logo'} alt="ChristianLifeAcademy-Logo" style={{ width: '12rem' }} /></a>
					</div>
					<div className="d-flex align-items-center">
						<button className="navbar-toggler navbar-toggler-right border-0 p-0 position-relative" type="button" onClick={() => window.location.href = '/notification'}>
							{
								unread_notif > 0 &&
								<i className="bi bi-circle-fill position-absolute" style={{ fontSize: '.5rem', color : 'red', right : '.625rem', top : 0 }}></i>
							}
							<i className="bi bi-bell-fill text-primary mr-2" style={{ fontSize: '1.25rem' }}></i>
						</button>
						<button className="navbar-toggler navbar-toggler-right border-0 p-0" type="button" onClick={() => sidebar(true)}>
							<i className="fas fa-bars text-primary" style={{ fontSize: '1.75rem' }}></i>
						</button>
					</div>
				</div>
				<div className={"sidebar" + (is_sidebar ? ' active' : '')}>
					<div className='position-absolute p-5 ' style={{ right: 0, top: '5%', 'zIndex': '1' }}>
						<span onClick={() => sidebar(false)} >
							<i className="fas fa-times" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
						</span>
					</div>
					<div className='row m-0'>
						<div className='col-12' style={{ height: '100vh' }}>
							<div className='d-flex align-middle h-100 align-items-center'>

								<div className='row'>
									<div className='col-12 mt-3'>
										<div className='row m-0'>
											<div className='col-auto'>
												<ul className="navbar-nav text-uppercase">
													{
														header_nav_arr.map((data, index) => (
															<li className={"nav-item" + (index !== 0 ? ' ml-0 ml-lg-3' : '') + (pathname === data.url ? ' nav_active' : '')} key={index}>
																{
																	data.dropdown_arr.length > 0 ?
																	<>
																	<a className="nav-link dropdown-toggle text-primary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" style={{fontSize : '1.5rem'}}>{data.title}</a>
																	<div className="dropdown-menu" aria-labelledby="navbarDropdown">
																		{
																			data.dropdown_arr.map((dataDropdown, indexDropdown)=>(
																				<a className={"dropdown-item" + (pathname === dataDropdown.nav ? ' bg-secondary text-white' : '')} href={dataDropdown.nav} key={indexDropdown}><i className={dataDropdown.icon + ' mr-3' + (pathname === dataDropdown.nav ? ' text-white' : '')} style={{color : '#767676', fontSize : '1.5rem'}}></i>{dataDropdown.title}</a>
																			))
																		}
																	</div>
																	</>
																	:
																	<a className="nav-link js-scroll-trigger text-primary" href={data.url} style={{ fontSize: '1.5rem' }}>
																		{
																			data.icon != '' &&
																			<h5><i className={data.icon}></i></h5>
																		}
																		{data.title}
																	</a>
																}
															</li>
														))
													}
													<li className={"nav-item mb-2 ml-0 ml-lg-3"}>
														<a className="nav-link js-scroll-trigger text-primary" href='#!' onClick={()=>logout()}>
															<div className='row m-0'>
																<div className='col-auto p-0'>
																	<div className='d-flex align-items-center justify-content-center' style={{height : '2.25rem', width : '2.25rem', backgroundColor : '#ED757C', borderRadius : '.5rem'}}>
																		<h5 className='m-0'><i className="bi bi-power text-white"></i></h5>
																	</div>
																</div>
																<div className='col-auto d-flex align-items-center justify-content-center'>
																	<p className='m-0' style={{fontFamily : 'InterBold'}}>Loging Out</p>
																</div>
															</div>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}