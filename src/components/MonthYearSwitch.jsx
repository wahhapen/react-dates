import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  date: momentPropTypes.momentObj,
  onSelectMonth: PropTypes.func,
  onSelectYear: PropTypes.func,
});

const defaultProps = {
  date: moment(),
  onSelectMonth() {},
  onSelectYear() {},
};

export class MonthSelector extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      date, onSelectMonth, onSelectYear, styles,
    } = this.props;

    const currentMonth = date.format('MMMM');
    const currentYear = date.format('YYYY');

    return (
      <div {...css(styles.MonthYearSwitch)}>
        <div {...css(styles.Month)}>
          <button
            {...css(styles.MonthYear__button)}
            onClick={() => onSelectMonth(date, date.get('month') - 1)}
          >
            <LeftArrow {...css(styles.MonthYear__svg)} />
          </button>
          <button
            {...css(styles.MonthYear__button)}
            onClick={() => onSelectMonth(date, date.get('month') + 1)}
          >
            <RightArrow {...css(styles.MonthYear__svg)} />
          </button>
          <span {...css(styles.Month__title)}>{currentMonth}</span>
        </div>
        <div {...css(styles.Year)}>
          <span {...css(styles.Year__title)}>{currentYear}</span>
          <button
            {...css(styles.MonthYear__button)}
            onClick={() => onSelectYear(date, date.get('year') - 1)}
          >
            <LeftArrow {...css(styles.MonthYear__svg)} />
          </button>
          <button
            {...css(styles.MonthYear__button)}
            onClick={() => onSelectYear(date, date.get('year') + 1)}
          >
            <RightArrow {...css(styles.MonthYear__svg)} />
          </button>
        </div>
      </div>
    );
  }
}

MonthSelector.propTypes = propTypes;
MonthSelector.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, zIndex } }) => ({
  MonthYearSwitch: {
    height: '21px',
  },
  MonthYear__button: {
    border: `1px solid ${color.core.border}`,
    backgroundColor: color.background,
    color: color.placeholder,
    cursor: 'pointer',
    borderRadius: '3px',
    padding: '3px 6px',
    verticalAlign: 'middle',
    zIndex: zIndex + 2,

    ':focus': {
      border: `1px solid ${color.core.borderMedium}`,
    },
    ':hover': {
      border: `1px solid ${color.core.borderMedium}`,
    },
    ':active': {
      background: `darken(${color.core.white}, 5%)`,
    },
  },

  MonthYear__svg: {
    height: '13px',
    width: '13px',
    fill: color.core.grayLight,
  },

  Month: {
    display: 'inline-block',
    textAlign: 'left',
    width: '60%',
  },
  Year: {
    display: 'inline-block',
    textAlign: 'right',
    width: '40%',
  },
  Month__title: {
    fontSize: font.size,
    fontWeight: 500,
    marginLeft: '10px',
  },
  Year__title: {
    fontSize: font.size,
    fontWeight: 500,
    marginRight: '10px',
  },
}))(MonthSelector);
