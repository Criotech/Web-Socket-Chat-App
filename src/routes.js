import PublicChat from './components/PublicChat';
import RoomChat from './components/RoomChat';
import LiveVisitor from './components/LiveVisitors';

export default [
    { path: "/", exact: true, Component: PublicChat },    
    { path: "/liveVisitors", exact: true, Component: LiveVisitor },
    { path: "/roomChat", exact: true, Component: RoomChat }   
]