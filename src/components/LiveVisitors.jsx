import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table
} from 'reactstrap';


import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:6001')


const LiveVisitors = (props) => {

  const [visitors, updateVisitor] = useState([]);

  useEffect(() => {
    axios.get('http://www.geoplugin.net/json.gp')
      .then(res => {
        const {
        geoplugin_request,
          geoplugin_countryCode,
          geoplugin_city,
          geoplugin_region,
          geoplugin_countryName
       } = res.data

        const visitor = {
          ip: geoplugin_request,
          countryCode: geoplugin_countryCode,
          city: geoplugin_city,
          state: geoplugin_region,
          country: geoplugin_countryName
        }

        socket.emit('new_visitor', visitor)

        socket.on('visitor', visitors => {
          updateVisitor(visitors)
        })
      })
  }, [])

  const getCountryFlag = (countryCode) => `https://www.countryflags.io/${countryCode}/flat/64.png`

  const renderTableBody = () => {
    return visitors.map((v, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v.ip}</td>
          <td>
            <img src={getCountryFlag(v.countryCode)} alt='' />
          </td>
          <td>{v.city}</td>
          <td>{v.state}</td>
          <td>{v.country}</td>
        </tr>
      )
    })
  }

  return (
    <React.Fragment>
      <h2>Live Visitors</h2>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Flag</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </Table>
    </React.Fragment>

  );
}

export default LiveVisitors;