import React, {Component} from 'react'
// import '../App.css'
import axios from 'axios'
import moment from 'moment'
import Jquery from 'jquery'

import 'popper.js'
import 'bootstrap'

export default class Base extends Component{
    
    base_url = 'https://lms-admin.quantumtri.com/api';
    url_image = 'https://lms-admin.quantumtri.com/image';

	// base_url = 'https://admin.christianlifeacademy-id.com/api'
	// url_image = 'https://admin.christianlifeacademy-id.com/image';
	
    timeoutAxios = 300000
    currencyFormat = 'id-ID'

    axios = axios
    moment = moment
    $ = Jquery

    constructor(props){
		super(props)
		axios.defaults.headers.common['Content-Type'] = 'application/json'
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios.defaults.timeout = this.timeoutAxios
	}

    async request(url, method = "get", data = {}, onUploadProgress = response => {}){
		var token = await localStorage.getItem('token')
		if(token != null){
			axios.defaults.headers.common['Authorization'] = token
		}

		try{
		  var response
		  if(method === 'get'){
			  response = await axios.get(this.base_url + url)
		  }
		  else if(method === 'post'){
			  response = await axios.post(this.base_url + url, data, {
				  headers: {"Content-Type": "application/json"},
				onUploadProgress
			  })
		  }
		  else if(method === 'put'){
			  response = await axios.put(this.base_url + url, data, {
				headers: {"Content-Type": "application/json"},
				onUploadProgress
			  })
		  }
		  else if(method === 'delete'){
			  response = await axios.delete(this.base_url + url)
		  }

		  return response.data
		} catch (e) {
		  setTimeout(() => {
			console.log(this.base_url + url, e)
		  }, 500)
		}
	}

	// img_welcome = require('../assets/img/welcome.png')
	img_logo_text = require('../assets/img/logo.png')
	img_logo = require('../assets/img/CLA_Logo.png')
	img_logo_talent = require('../assets/img/CLA_Talent_logo.png')
	img_tree_talent = require('../assets/img/tree_talent.png')
	img_no_image = require('../assets/img/no_image_available.jpeg')
	img_no_profile = require('../assets/img/no_profile_picture.png')
	img_trophy = require('../assets/img/trophy.png')
	img_background = require('../assets/img/bg.png')

	img_borderTop_primary = require('../assets/img/borderTop-primary.png')
	img_borderLeft_primary = require('../assets/img/borderLeft-primary.png')
	img_borderTop_secondary = require('../assets/img/borderTop-secondary.png')

	img_study_1 = require('../assets/img/study_1.png')
	img_study_2 = require('../assets/img/study_2.png')
	img_study_3 = require('../assets/img/study_3.png')
	img_star = require('../assets/img/star.png')
	img_leaves = require('../assets/img/leaves.png')
	img_img_1 = require('../assets/img/img_1.png')

	img_modal_ungraded = require('../assets/img/image_modal_ungraded.png')

	img_under_construction = require('../assets/img/under_construction.png')

	async update_array(arr, set_state, data = {}, index = 0){
		var temp = [...arr]
		temp[index] = data
		set_state(temp)
	}
	
	add_array(arr, set_state, data = {}){
		var temp = [...arr]
		temp.push(data)
		set_state(temp)
	}

	update_object(data, set_state, variable = null, key = ''){
		var temp = JSON.parse(JSON.stringify(data))
		temp[key] = variable
		set_state(temp)
	}


	url_photo(type, file_name){
		var image_url = this.url_image + '/' + type + '?file_name=' + file_name + '&rnd=' + moment().format('HHmmss')
		return image_url
	}

	async checkAuth(){
		var token = localStorage.getItem('token')
        if(token == null){
			localStorage.clear()
			window.location.href = '/auth/login'
        }
		else{
			var url = '/auth/profile'
			var response = await this.request(url)
			if(response != null){
				if(response.status == 'success'){
					if(response.data.type.name !== 'teacher'){
						localStorage.clear()
						window.location.href = '/auth/login'
					}

					var image_display = this.img_no_profile
					
					if(response.data.file_name != null){
						image_display = this.url_photo('user', response.data.file_name)
					}
					response.data.image = {image_display : image_display, image : '', original_rotation : 0, type : ''}
					return {user_data : response.data}
				}
			}
			else{
				// localStorage.clear()
				// window.location.href = '/auth/login'
			}
		}
	}
}