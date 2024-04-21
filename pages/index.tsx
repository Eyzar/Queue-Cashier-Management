/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Col, Input, Row, Space } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Page } from '../types/Page';
import { useAtom } from 'jotai';
import dataListAtom from '@/data/data';
import { Controller,  useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const IndexPage: Page = () => {
    const [queue, setQueue] = useAtom(dataListAtom);
    
    /**
     * Create new Data
     */
    function onSubmit(newQueue){
        const rand = Math.floor(Math.random() * 3);
        const updateQueue = queue.slice(0);
        updateQueue[rand]?.push(newQueue.queue);
        
        setQueue(updateQueue)
    }
    
    /*
    * Deleting the first data when button handle is clicked
    */
    function onDelete(index){
        const updateQueue = queue.slice(0);
        updateQueue[index]?.shift();
        console.log(updateQueue);
        
        setQueue(updateQueue)
    }

    /** 
     * Validating the input form
    */
    const NewQueueFormSchema = z.object({
        queue: z.string().nonempty({ message: 'Name is required.' })
            .max(50, { message: 'Name must be less than 50 characters.' })
            .refine((value)=> !queue.some(row => row.includes(value)), { message: 'Name cannot be a duplicate.' })
    });

    type NewQueueFormType = z.infer<typeof NewQueueFormSchema>;

    const { handleSubmit, control, formState: { errors }} = useForm<NewQueueFormType>({
        resolver: zodResolver(NewQueueFormSchema),
        mode: 'onSubmit'
    });
    

    return (
        <div>
            <Row gutter={[0,32]}>
                {queue.map( (item,index) => (
                    <Col key={index} span={8}  className='text-center bg-green-200 '>
                        <h1 className='font-bold text-xl mb-2 bg-white p-4'>Cashier {index +1}</h1>
                        <Space direction='vertical' size={'middle'}>
                            {item.slice(0,3)}
                            {item.length > 3 && <p>{item.length - 3} more</p>}
                        </Space>
                        
                    </Col>
                ))} 
            </Row>
    
            <Row className='mt-5 p-4'>
                <Col span={12}> 
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                            <Row>
                                <Col>
                                    <Controller 
                                        name="queue"
                                        control={control}
                                        render={({ field }) => <Input id="name" placeholder="Name"
                                            addonBefore="Name:" {...field} />} 
                                            />
                                    {errors.queue && <p className="text-red-500">{errors.queue.message}</p>}
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit" className="createBtn bg-blue-600">Create New Queue</Button>
                        </Space>
                    </form>
                </Col>
                
                <Col span={12}>
                    <Row>
                        <Button type='primary' danger onClick={() => onDelete(0)}>Handle Cashier #1</Button>
                    </Row>
                    <Row>
                        <Button className=" mt-5 mb-5" type='primary' danger onClick={() => onDelete(1)}>Handle Cashier #2</Button>
                    </Row>
                    <Row>
                        <Button type='primary' danger onClick={() => onDelete(2)}>Handle Cashier #3</Button>
                    </Row>
                </Col>

                
            </Row>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
