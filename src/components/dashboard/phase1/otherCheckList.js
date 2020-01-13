import _ from 'lodash';
import React, { PureComponent } from 'react';
import { formatAmount2, formatCount } from '../../../common/utils';
import Category from '../../../components/dashboard/modal/category';
import commonCSS from "../../../css/commonCSS";
import Modal from '../../common/modal';
import ResolveReviewBox from "../../resolveReview/resolveReviewBox";
import CheckListBox from "../boxes/checkListBox";

class Index extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalTitle: '',
            showCategaryModal: false
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(value) {
        this.setState({ showCategaryModal: value, modalTitle: '' });
    }

    emptyClick = () => e => {

    }

    getTableData = (arrayData) => {
        let tableData = [];
        tableData.push(['CATEGORY', 'BASELINE $', '# IDEAS'])
        _.map(arrayData, (item) => {
            tableData.push([item.Title, formatAmount2(item.BaselineValue, true, false), formatCount(item.IdeaCount)]);
        })
        return tableData;
    }

    showModal = (title) => e => {
        this.setState({ showCategaryModal: true, modalTitle: 'NonPersonnelBaseline' });
    }

    getCount = (isCompanyView, resolveReviewData, isPendingSharesTransfers) => {
        if (isCompanyView && !isPendingSharesTransfers && resolveReviewData) {
            return resolveReviewData.length > 0 ? _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" })[0].IdeaCount : 0;
        }
        else {
            if (isPendingSharesTransfers) {
                return _.sumBy(_.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" }), 'IdeaCount');
            }
            return _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title != "Total" && resolveReview.Title !== 'Unassigned' && resolveReview.IdeaCount === 0 }).length;
        }
    }


    checkListBox(title, data, rrView, viewModal) {
        const count = this.getCount(this.props.isCompanyView, data, title === 'PendingSharesTransfers' ? true : false);
        if (rrView) {
            return (
                <ResolveReviewBox key={title}
                    colorStyle={(count > 0 ? commonCSS.danger : commonCSS.success)}
                    title={title} value={0}
                    count={count} type={1} showLinkButton={false} //onDetailsClick={this.showModal}
                />
            )
        } else {
            return (
                <CheckListBox key={title}
                    colorStyle={commonCSS.confirm}
                    title={title} value={0} count={count} type={1} showOtherDetail={false}
                    buttonTitle={title === 'PendingSharesTransfers' ? 'ViewIdeas' : 'Details'}
                    onDetailsClick={viewModal ? this.showModal : this.emptyClick}
                />
            )
        }
    }

    categoryContent(tableData) {
        return <Category tableData={tableData} />
    }

    render() {
        if (!this.props.dashboardCheckList) return <></>;
        const dashboardCheckList = this.props.dashboardCheckList;
        const rrView = this.props.rrView;
        const rrViewType = this.props.rrViewType;

        return (
            <>
                {(!rrView || rrViewType === 2) &&
                    [
                        this.checkListBox('CategoriesWithoutAnyImpact', dashboardCheckList.CategoriesWithoutAnyImpact, rrView, true),
                        this.checkListBox('FunctionalTitlesWithoutAnyImpact', dashboardCheckList ? dashboardCheckList.FunctionalTitlesWithoutAnyImpact : [], rrView)
                    ]
                }

                {(!rrView || rrViewType === 1) &&
                    this.checkListBox('PendingSharesTransfers', dashboardCheckList ? dashboardCheckList.PendingSharesTransfers : [], rrView)
                }

                <Modal title={this.state.modalTitle} isOpen={this.state.showCategaryModal}
                    setModalVisible={this.setModalVisible}
                    content={this.state.showCategaryModal ? this.categoryContent(this.getTableData(dashboardCheckList.CategoriesWithoutAnyImpact)) : ''} />
            </>
        )
    }
}

export default Index;