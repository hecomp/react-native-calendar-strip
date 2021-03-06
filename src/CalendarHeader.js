import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text,View } from "react-native";

import styles from "./Calendar.style.js";
import WeekSelector from "./WeekSelector";

class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    datesForWeek: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(datesForWeek, calendarHeaderFormat) {
    if (!datesForWeek || datesForWeek.length === 0) {
      return "";
    }

    let firstDay = datesForWeek[0];
    let lastDay = datesForWeek[datesForWeek.length - 1];
    let monthFormatting = "";
    //Parsing the month part of the user defined formating
    if ((calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
      monthFormatting = "Mo";
    } else {
      if ((calendarHeaderFormat.match(/M/g) || []).length > 0) {
        for (
          let i = (calendarHeaderFormat.match(/M/g) || []).length;
          i > 0;
          i--
        ) {
          monthFormatting += "M";
        }
      }
    }

    if (firstDay.month() === lastDay.month()) {
      return firstDay.format(calendarHeaderFormat);
    } else if (firstDay.year() !== lastDay.year()) {
      return `${firstDay.format(calendarHeaderFormat)} / ${lastDay.format(
        calendarHeaderFormat
      )}`;
    }

    return `${monthFormatting.length > 1
      ? firstDay.format(monthFormatting)
      : ""} ${monthFormatting.length > 1 ? "/" : ""} ${lastDay.format(
      calendarHeaderFormat
    )}`;
  }

  render() {
    const headerText = this.formatCalendarHeader(
      this.props.datesForWeek,
      this.props.calendarHeaderFormat
    );
    return ( 
      <View style={[styles.calendarDates,]}>
      <WeekSelector
        controlDate={this.props.minDate}
        iconComponent={this.props.leftSelector}
        iconContainerStyle={this.props.iconContainer}
        iconInstanceStyle={this.props.iconLeftStyle}
        iconStyle={this.props.iconStyle}
        imageSource={this.props.iconLeft}
        onPress={this.props.getPreviousWeek}
        weekEndDate={
          this.props.datesForWeek[this.props.datesForWeek.length - 1]
        }
        weekStartDate={this.props.datesForWeek[0]}
        size={this.props.selectorSize}
      />

      <Text
        style={[
          styles.calendarHeader,
          { fontSize: this.props.fontSize },
          this.props.calendarHeaderStyle
        ]}
      >
        {headerText}
      </Text>

      <WeekSelector
        controlDate={this.props.maxDate}
        iconComponent={this.props.rightSelector}
        iconContainerStyle={this.props.iconContainer}
        iconInstanceStyle={this.props.iconRightStyle}
        iconStyle={this.props.iconStyle}
        imageSource={this.props.iconRight}
        onPress={this.props.getNextWeek}
        weekEndDate={
          this.props.datesForWeek[this.props.datesForWeek.length - 1]
        }
        weekStartDate={this.props.datesForWeek[0]}
        size={this.props.selectorSize}
      />
    </View>
    );
  }
}

export default CalendarHeader;