import React from 'react'
import HomeWorksWeeks from './FhomeWorkWeeks/HomeWorksWeeks2'//for components

const ContensAdmind = (props) => {
    const {user}=props
    return (
        <div>
            {user && (
                <div>
                    <div className="col-sm-12">
                        <h2 className="text-center text-info">Tareas Asignadas</h2>
                    </div>
                    <HomeWorksWeeks />
                </div>
            )}
        </div>
    )
}

export default ContensAdmind
