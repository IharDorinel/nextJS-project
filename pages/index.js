import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";
import {Fragment} from "react";


function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetup={props.meetups} />
        </Fragment>
        )
}


export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.89fen.mongodb.net/graphql?retryWrites=true&w=majority')

    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage


// export async function getServerSideProps(context) {
//
//     const req = context.req
//     const res = context.res
//
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     }
// }

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         address: 'Some address 8, 12345 Some City',
//         description: 'This is a second meetup!'
//     }
// ]