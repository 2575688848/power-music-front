import MainPage from '../../components/MainPage'
import Login from '../../components/Login' 
import Bar from '../../components/Bar';
import NetTab from '../../components/NetTab';
import SongList from '../../components/SongList';
import HotMusic from '../../components/HotMusic';
import HotMV from '../../components/HotMV';
import Introduction from '../../components/Introduction';
import Test from '../../components/Test';
import SearchList from '../../components/SearchList';
import SearchMV from '../../components/SearchMV';
import AlbumList from '../../components/AlbumList';
import Blank from '../../components/Blank';
import Register from '../../components/Register';

import Person from '../../components/local/Person';
import HeadLibrary from '../../components/local/HeadLibrary';
import PerfectInfo from '../../components/local/PerfectInfo';
import SearchEaseUser from '../../components/local/SearchEaseUser';
import NetEaseUser from '../../components/local/NetEaseUser';
import NetUserInfo from '../../components/local/NetUserInfo';
import NetSongList from '../../components/local/NetSongList';
import PlayMusic from '../../components/local/PlayMusic';
import LocalSongList from '../../components/local/LocalSongList';
import PlayLocalMusic from '../../components/local/PlayLocalMusic';
import LocalMV from '../../components/local/LocalMV';
import Analysis from '../../components/local/Analysis';

export default  [
	{ path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/main', component: MainPage },
	{ path: '/bar', component: Bar },
	{ path: '/nettab', component: NetTab },
	{ path: '/songlist', component: SongList },
	{ path: '/hotmusic', component: HotMusic },
	{ path: '/hotmv', component: HotMV },
	{ path: '/introduction', component: Introduction },
	{ path: '/test', component: Test },
	{ path: '/searchlist', component: SearchList },
	{ path: '/searchmv', component: SearchMV },
	{ path: '/album', component: AlbumList },
	{ path: '/blank', component: Blank },
	{ path: '/register', component: Register },
	
	{ path: '/local/person', component: Person },
	{ path: '/local/head', component: HeadLibrary },
	{ path: '/local/perfectInfo', component: PerfectInfo },
	{ path: '/local/searchEaseUser', component: SearchEaseUser },
	{ path: '/local/netEaseUser', component: NetEaseUser },
	{ path: '/local/netUserInfo', component: NetUserInfo },
	{ path: '/local/netSongList', component: NetSongList },
	{ path: '/local/playMusic', component: PlayMusic },
	{ path: '/local/localSongList', component: LocalSongList },
	{ path: '/local/playLocalMusic', component: PlayLocalMusic },
	{ path: '/local/localMV', component: LocalMV },
	{ path: '/local/analysis', component: Analysis }
]