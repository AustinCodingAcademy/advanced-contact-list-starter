/**
 * Created by brianmichael on 2/1/17.
 */
import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

class ActionHistory extends Component {


    render() {
        return (
            <section className="action-history">
                <h3>Action History</h3>
                {
                    this.props.actions.map(action => {
                        return (<p
                            key={action._id}
                            onClick={(event) => this.props.removeAction(event, action._id)}>{action.description}
                            <FontAwesome
                                name='times'/>
                        </p>)
                    })
                }
            </section>
        )
    }

}

export default ActionHistory;