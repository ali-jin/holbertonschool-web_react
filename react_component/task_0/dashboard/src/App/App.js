import React from 'react'
import './App.css'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import Notifications from '../Notifications/Notifications'
import PropTypes from 'prop-types'
import CourseList from '../CourseList/CourseList'
import { getLatestNotification } from '../utils/utils'

class App extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool
    }

    static defaultProps = {
        isLoggedIn: false
    }

    render() {
        const isIndex = true
        const listCourses = [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 }
        ]
        const listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', value: { __html: getLatestNotification() } }
        ]

        return (
            <>
                <Notifications listNotifications={listNotifications} />
                <div className="App">
                    <Header />
                    {this.props.isLoggedIn ? (
                        <CourseList listCourses={listCourses} />
                    ) : (
                        <Login />
                    )}
                    <Footer isIndex={isIndex} />
                </div>
            </>
        )
    }
}

export default App
