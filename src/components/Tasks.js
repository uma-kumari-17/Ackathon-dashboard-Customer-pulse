import React, { useEffect, useState } from 'react'
import UilSearch from '@iconscout/react-unicons/icons/uil-search'
import UilToggle from '@iconscout/react-unicons/icons/uil-arrow-left'
import UilCompleted from '@iconscout/react-unicons/icons/uil-check-square'
import UilSetting from '@iconscout/react-unicons/icons/uil-setting'
import UilNotification from '@iconscout/react-unicons/icons/uil-bell'
import UilAddon from '@iconscout/react-unicons/icons/uil-plus'
import UilFilter from '@iconscout/react-unicons/icons/uil-filter'
import UilBoard from '@iconscout/react-unicons/icons/uil-layer-group'
import UilUser from '@iconscout/react-unicons/icons/uil-user'
import UilStatus from '@iconscout/react-unicons/icons/uil-clock'

import { useDarkMode } from './DarkModeContext';

import datas from '../data.json';

import { Tab, Tabs, Dropdown } from 'react-bootstrap';

import userAvatar from '../images/avatar.png'

const Tasks = ({ handleSidebarToggle }) => {
    const [key, setKey] = useState('tasks');

    // checkbox
    const [selectedOption, setSelectedOption] = useState('opt1'); // Set the default selected option
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.id);
    };


    // dark ligt toggle
    const { darkMode } = useDarkMode();
    const [tasks, setTasks] = useState([]);

    // task based status
    useEffect(() => {
        // Flatten the data structure and set the tasks state when the component mounts
        const flattenedTasks = datas.flatMap(sprint =>
            sprint.milestones.flatMap(milestone =>
                milestone.tasks.map(task => ({ ...task, milestoneName: milestone.milestoneName }))
            )
        );
        setTasks(flattenedTasks);
    }, []);

    const doneTasks = tasks.filter(task => task.status === "Done");
    const yetStartTasks = tasks.filter(task => task.status === "Yet to start");
    const progressTasks = tasks.filter(task => task.status === "In progress");
    // console.log(tasks, 'console.log(tasks);');


    // search functionality
    const [searchTerm, setSearchTerm] = useState('');
    const filterTasksByName = (tasks) => {
        return tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };


    // filter funcationlity
    // Add state for filter values
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [assigneeFilter, setAssigneeFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');


    // Update your filterTasksByName function to include additional filters
    const filterTasks = (tasks) => {
        return tasks
            .filter((task) =>
                task.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(
                (task) =>
                    (!startDateFilter || task.startDate.includes(startDateFilter)) &&
                    (!endDateFilter || task.endDate.includes(endDateFilter)) &&
                    (!assigneeFilter || task.assignee === assigneeFilter) &&
                    (!priorityFilter || task.priority === priorityFilter)
            );
    };
    // Extract unique assignee and priority values
    const uniqueAssignees = [...new Set(tasks.map((task) => task.assignee))];
    const uniquePriorities = [...new Set(tasks.map((task) => task.priority))];

    // Function to handle reset
    const handleResetFilters = () => {
        setStartDateFilter('');
        setEndDateFilter('');
        setAssigneeFilter('');
        setPriorityFilter('');
        setSearchTerm('');
    };


    // Drag and Drop state variables
    const [draggedItem, setDraggedItem] = useState(null);
    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropZone) => {
        e.preventDefault();
        console.log('Dropped into:', dropZone, draggedItem);
        setDraggedItem(null);
    };
    return (
        <>
            <section className={`dashboard ${darkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className="top">
                    <UilToggle onClick={handleSidebarToggle} className='sidebar-toggle' />
                    <div className='project-head'>
                        <div className='project-title'>
                            <h3>Customer Pulse</h3>
                            <div className="mode-toggle">
                                <img src={userAvatar} className='img-fluid' />
                            </div>
                            <ul
  className="menu"
  style={{
    position: 'fixed',
    top: '20px', 
    right: '20px', 
    zIndex: 1000, 
    display: 'flex', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    gap: '15px', 
  }}
>
  <li>
    <p className="settings" style={{ cursor: 'pointer' }}>
      <UilSetting />
    </p>
  </li>
  <li>
    <p className="notify" style={{ cursor: 'pointer' }}>
      <UilNotification />
    </p>
  </li>
</ul>
                        </div>

                        <div className='project-slogan'>
                            <p>Resolution made smarter, faster, and easier</p>
                        </div>

                    </div>

                </div>

                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >

                    <Tab eventKey="overview" title="Overview"></Tab>

                    <Tab eventKey="Issue" title="Issue">
                        <div className='task-nav pt-3'>
                            <div className='task-filter'>
                                <ul>
                                    <li> <label htmlFor="startDate">Start Date</label>
                                        <input
                                            type="date"
                                            placeholder="Start Date"
                                            value={startDateFilter}
                                            onChange={(e) => setStartDateFilter(e.target.value)}
                                            className='form-control form-control-sm'
                                            id='startDate'
                                        /></li>
                                    <li>
                                        <label htmlFor="endDate">End Date</label>
                                        <input
                                            type="date"
                                            placeholder="End Date"
                                            value={endDateFilter}
                                            onChange={(e) => setEndDateFilter(e.target.value)}
                                            className='form-control form-control-sm'
                                            id='endDate'
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="assignees">Assignees</label>
                                        <select
                                            value={assigneeFilter}
                                            onChange={(e) => setAssigneeFilter(e.target.value)}
                                            id='assignees'
                                            className='form-control form-control-sm'
                                        >
                                            <option value="">All Assignees</option>
                                            {uniqueAssignees.map((assignee) => (
                                                <option key={assignee} value={assignee}>
                                                    {assignee}
                                                </option>
                                            ))}
                                        </select>
                                    </li>
                                    <li>
                                        <label htmlFor="priorities">Priorities</label>
                                        <select
                                            value={priorityFilter}
                                            onChange={(e) => setPriorityFilter(e.target.value)}
                                            id='priorities'
                                            className='form-control form-control-sm'
                                        >
                                            <option value="">All Priorities</option>
                                            {uniquePriorities.map((priority) => (
                                                <option key={priority} value={priority}>
                                                    {priority}
                                                </option>
                                            ))}
                                        </select>
                                    </li>
                                    <li>
                                        <button onClick={handleResetFilters} className='btn btn-outline-secondary btn-sm reset-btn'>Reset Filters</button>

                                    </li>

                                </ul>
                            </div>



                            <div className='task-filter'>
                                <ul>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Search tasks by name"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className='search-input'
                                        />
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                <UilBoard /> Board
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='task-layouts container pt-3'>
                            <div className='row'>
                                <div 
                                    className='col-lg-3 col-md-12 col-sm-12 dnd drop-zone' 
                                    onDragOver={(e) => handleDragOver(e)} 
                                    onDrop={(e) => handleDrop(e, 'backlog')}
                                >
                                    
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 dndgit add'>
                              <p className='layout-title b-default'>RECENT ISSUES <span>({yetStartTasks.length})</span></p>

                                    {Array.isArray(yetStartTasks) && yetStartTasks.length > 0 ? (
                                        filterTasks(yetStartTasks).map((task) => (
                                            <div
                                                className={`task-board ${draggedItem === task ? 'dragged-item' : ''}`}
                                                key={task.primaryId}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task)}
                                                onDragOver={(e) => handleDragOver(e)}
                                                onDrop={(e) => handleDrop(e, 'todo')}
                                            >
                                                <p className='tasktitle'>{task.name}</p>
                                                <a href='#' className='task-tag'>
                                                    <UilUser /> {task.assignee}
                                                </a>
                                                <a href='#' className={`task-tag priority ${(task.priority)}`}>
                                                    <UilStatus /> {task.priority}
                                                </a>
                                                <p className='pt-2'>
                                                   
                                                    <span className='datetime'>{task.startDate}</span>
                                                    <span className='datetime'>Effect <strong>{task.effortSpent}</strong></span>
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tasks available.</p>
                                    )}
                                </div>

                                <div className='col-lg-3 col-md-12 col-sm-12 dnd'>
                                 

                                    {Array.isArray(progressTasks) && progressTasks.length > 0 ? (
                                        filterTasks(progressTasks).map((task) => (
                                            <div
                                                className={`task-board ${draggedItem === task ? 'dragged-item' : ''}`}
                                                key={task.primaryId}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task)}
                                                onDragOver={(e) => handleDragOver(e)}
                                                onDrop={(e) => handleDrop(e, 'in progress')}
                                            >
                                                <p className='tasktitle'>{task.name}</p>
                                                <a href='#' className='task-tag'>
                                                    <UilUser /> {task.assignee}
                                                </a>
                                                <a href='#' className={`task-tag priority ${(task.priority)}`}>
                                                    <UilStatus /> {task.priority}
                                                </a>
                                                <p className='pt-2'>
                                                  
                                                    <span className='datetime'>{task.startDate}</span>
                                                    <span className='datetime'>Effect <strong>{task.effortSpent}</strong></span>
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tasks available.</p>
                                    )}

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 dnd'>

                                    {Array.isArray(doneTasks) && doneTasks.length > 0 ? (
                                        filterTasks(doneTasks).map((task) => (
                                            <div
                                                className={`task-board ${draggedItem === task ? 'dragged-item' : ''}`}
                                                key={task.primaryId}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task)}
                                                onDragOver={(e) => handleDragOver(e)}
                                                onDrop={(e) => handleDrop(e, 'done')}
                                            >
                                                <p className='tasktitle'>{task.name}</p>
                                                <a href='#' className='task-tag'>
                                                    <UilUser /> {task.assignee}
                                                </a>
                                                <a href='#' className={`task-tag priority ${(task.priority)}`}>
                                                    <UilStatus /> {task.priority}
                                                </a>
                                                <p className='pt-2'>
                                                   
                                                    <span className='datetime'>{task.startDate}</span>
                                                    <span className='datetime'>Effect <strong>{task.effortSpent}</strong></span>
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tasks available.</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </Tab>


                    <Tab eventKey="Query" title="Query" ></Tab>
                    <Tab eventKey="Feedback" title="Feedback" ></Tab>
                    <Tab eventKey="Request" title="Request" ></Tab>
    
                </Tabs>
            </section>
        </>
    )
}

export default Tasks