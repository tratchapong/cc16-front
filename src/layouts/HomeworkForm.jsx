import { useState } from 'react'

export default function HomeworkForm() {
    const [input, setInput] = useState({
        subject_id: '',
        question: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    return (
        <div className='min-w-[600px] w-4/6 flex flex-col gap-3 border mx-auto p-3'>
            <h1 className="text-4xl">New Homework</h1>
            <form className='flex flex-col gap-2'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Select Subject</span>
                    </div>
                    <select value={input.subject_id} className="select select-primary w-full max-w-xs" name='subject_id' onChange={hdlChange}>
                        <option value='' disabled selected>What is the best TV show?</option>
                        <option value='1'>Game of Thrones</option>
                        <option value='2'>Lost</option>
                        <option value='3'>Breaking Bad</option>
                        <option value='4'>Walking Dead</option>
                    </select>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Question</span>
                    </div>
                    <textarea placeholder="Question" className="textarea textarea-bordered textarea-lg w-full" name='question' value={input.question} onChange={hdlChange}></textarea>
                </label>
            </form>

        </div>
    )
}
