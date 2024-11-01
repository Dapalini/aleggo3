"use client"
import React from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { IoMdTime } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { fakeWorkplans } from '@/types/fakeWorkplan';
import { useParams } from 'next/navigation';


const WorkplanView = () => {
	
    const {id} = useParams()
    const name = "Stuerguer"
    const address = "Herningegade 12"

    const workplan = fakeWorkplans.workplan;

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

	return (
		<div className='col-7 shadow p-5 mb-6 bg-white rounded border'>
			<div className='d-flex justify-content-between'>
				<h3>Workplans</h3>
				<Link href={`/customers/${id}/workplans/edit`}>
					<MdOutlineEdit style={{ fontSize:"26px"}}/>
				</Link>
			</div>
			<h3>{name}</h3>
			<h4>{address}</h4>
			<br></br>
			<div>
				{workplan.map((worker: any, indexWorker: any) => (
					<div className='mb-4' key={`worker-${indexWorker}`}>
						<h4>{`${worker.workerType.label} workplan`}</h4>
						<h4>{worker.assignedWorker.label}</h4>
						{worker.assignment.map((task: any, indexAssign: any) => (
							<div className="mt-3" key={`assignment-${indexAssign}`}>
								<h5>{`${
									task.frequency.label
								} on ${task.weekdays.map(
									(day: any) => {
                                        const dayLabel = weekDays[day-1]
                                        return (` ${dayLabel}`)
                                    }
								)}`}</h5>
								{task.tasks.map((job: any, indexInstruct: any) => (
									<div key={`instruction-${indexAssign}-${indexInstruct}`}>
										<h5>
											{`${
                                                _.isEmpty(job.taskValue) ? "" :
												job.amount > 1
													? job.amount + ' ' + job.taskValue.label + 's'
													: job.taskValue.label 
											} `}
											<IoMdTime
											/>
											{job.duration}
										</h5>
										<ul>
											{job.instruction.split('\n').map((step: any, indexStep: any) => (
												<li key={`step-${indexStep}`}>{step}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default WorkplanView;