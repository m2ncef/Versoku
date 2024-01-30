import { f7, Page, Block, BlockTitle, List, ListInput, Link, Button, ListItem, Toggle, BlockHeader, BlockFooter, Navbar } from 'framework7-react'
import packageJson from '../../package.json'

export default () => {
    return(
        <Page name='settings'>
            <Navbar large={false} title='Settings' backLink></Navbar>
            <Block className='dev'>
                <img alt='Logo' src={process.env.PUBLIC_URL + '/logo.jpg'}/>
                <h2>Versoku</h2>
                <h4>v{packageJson.version} - Developed by <Link external href='https://instagram.com/m2ncef'>moncef</Link></h4>
                <div className='SocialSettings'>
                    <Link external href='mailto:moncxf@icloud.com'><i className="fa fa-envelope-o"></i></Link>
                    <Link external href='https://github.com/m2ncef'><i className='fa fa-github'></i></Link>
                    <Link external href='https://instagram.com/m2ncef'><i className='fa fa-instagram'></i></Link>
                    <Link external href='https://telegram.me/moncxf'><i className='fa fa-telegram'></i></Link>
                    <Link external href='https://wa.me/+213793480662'><i className='fa fa-whatsapp'></i></Link>
                </div>
                <br/>
            </Block>
            <Block>
                <BlockTitle>Advanced</BlockTitle>
                <List style={{ color: 'var(--f7-theme-color)' }} simpleList strongIos dividersIos insetIos>
                    <ListItem title={'Clear Library'}/>
                    <ListItem title={'Clear Network Cache'}/>
                    <ListItem title={'Clear Read History'}/>
                    <ListItem style={{color:'red'}} title={'Reset'}/>
                <BlockFooter>If you need help, feel free to <Link external target='_blank' href='https://instagram.com/m2ncef'>dm me</Link></BlockFooter>
                </List>
            </Block>
        </Page>
    )
}