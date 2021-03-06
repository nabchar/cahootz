import React from 'react';
import { Link, hashHistory } from 'react-router';
import ChannelSearchItem from './channel_search_item';


class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let { allChannels,
          subscribeToChannel,
          subscribedChannels,
          closeModal,
          fetchMessages } = this.props;

    const channelSearchItems = allChannels.map((channel) => {
      return (
        <ChannelSearchItem
          key={channel.id}
          channel={channel}
          subscribeToChannel={subscribeToChannel}
          closeModal={closeModal}
          subscribedChannels={subscribedChannels}
          fetchMessages={fetchMessages} />
        );
      });

    return(
        <div className="channel-search-main">
          <section className="channel-search">
            <h1>Browse all channels</h1>
            <div className='channel-search-scroll'>  
              <ul>
                {channelSearchItems}
              </ul>
            </div>
          </section>
        </div>
    );
  }
}

export default ChannelSearch;
