import Vue from 'vue'
import Router from 'vue-router'

import Home from '../view/home/Home.vue';
import More from '../view/home/More.vue';
import AboutUs from '../view/home/AboutUs.vue';
import Notice from '../view/notice/Notice.vue';
import Article from '../view/notice/Article.vue';
import FillIn from '../view/notice/FillIn.vue';
import PhoneList from '../view/serve/PhoneList.vue';
import PhoneDetail from '../view/serve/PhoneDetail.vue';
import Warranty from '../view/serve/Warranty.vue';
import Points from '../view/points/Points.vue';
import Mine from '../view/user/Mine.vue';
import Mall from '../view/mall/Mall.vue';
import StoreDetail from '../view/mall/StoreDetail.vue';
import Library from '../view/library/Library.vue';
import BookList from '../view/library/BookList.vue';
import Borrow from '../view/library/Borrow.vue';
import BorrowDetail from '../view/library/BorrowDetail.vue';
import Rule from '../view/library/Rule.vue';
import DonateBook from '../view/library/DonateBook.vue';
import BookDetail from '../view/library/BookDetail.vue';
import DonationParticulars from '../view/library/DonationParticulars.vue';
import QuestSurvey from '../view/questionnaire/QuestSurvey.vue';
import Question from '../view/questionnaire/Question.vue';
import SubmitSuccess from '../view/questionnaire/SubmitSuccess.vue';
import MyMaintaining from '../view/serve/MyMaintaining.vue';
import DetailMaintaining from '../view/serve/DetailMaintaining.vue';
import Message from '../view/user/Message.vue';
import ChooseCommunity from '../view/buildings/ChooseCommunity.vue';
import ChooseHouse from '../view/buildings/ChooseHouse.vue';
import ListHouse from '../view/buildings/ListHouse.vue';
import HousingCertification from '../view/buildings/HousingCertification.vue';
import Set from '../view/user/Set.vue';
import BundlePhone from '../view/user/BundlePhone.vue';
import Advise from '../view/user/Advise.vue';
import Information from '../view/user/Information.vue';
import Name from '../view/user/Name.vue';
import NickName from '../view/user/NickName.vue';
import Sex from '../view/user/Sex.vue';
import Certified from '../view/buildings/Certified.vue';
import Donate from '../view/library/Donate.vue';
import Search from '../view/library/Search.vue';
import Detail from '../view/library/Detail.vue';
import BorrowBook from '../view/library/BorrowBook.vue';
import Pay from '../view/pay/Pay.vue';
import Order from '../view/pay/Order.vue';
import Address from '../view/pay/Address.vue';
import Appraise from '../view/pay/Appraise.vue';
import PhoneNum from '../view/user/PhoneNum.vue';
import Code from '../view/user/Code.vue';
import MsgArticle from '../view/user/MsgArticle.vue';
import OrderList from '../view/pay/OrderList.vue';
import OrderDetail from '../view/pay/OrderDetail.vue';


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: { requireAuth: true }
    },
    {
      path: '/warranty',
      name: 'Warranty',
      component: Warranty
    },
    {
      path: '/code',
      name: 'Code',
      component: Code
    },
    {
      path: '/phone_num',
      name: 'PhoneNum',
      component: PhoneNum
    },
    {
      path: '/appraise',
      name: 'Appraise',
      component: Appraise
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/library/borrow_book',
      name: 'BorrowBook',
      component: BorrowBook
    },
    {
      path: '/library/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/library/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/library/donate',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/library/donation_particulars',
      name: 'DonationParticulars',
      component: DonationParticulars
    },
    {
      path: '/library/book_detail',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/library/donate_book',
      name: 'DonateBook',
      component: DonateBook
    },
    {
      path: '/library/rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/library/borrow',
      name: 'Borrow',
      component: Borrow
    }, {
      path: '/library/BorrowDetail',
      name: 'BorrowDetail',
      component: BorrowDetail
    },
    {
      path: '/library/book_list',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/library',
      name: 'Library',
      component: Library
    },
    {
      path: '/Ccertified',
      name: 'Certified',
      component: Certified
    },
    {
      path: '/sex',
      name: 'Sex',
      component: Sex
    },
    {
      path: '/nick_name',
      name: 'NickName',
      component: NickName
    },
    {
      path: '/name',
      name: 'Name',
      component: Name
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/about_us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/advise',
      name: 'Advise',
      component: Advise
    },
    {
      path: '/bundle_phone',
      name: 'BundlePhone',
      component: BundlePhone
    },
    {
      path: '/set',
      name: 'Set',
      component: Set
    },
    {
      path: '/housing_certification',
      name: 'HousingCertification',
      component: HousingCertification
    },
    {
      path: '/list_house',
      name: 'ListHouse',
      component: ListHouse
    },
    {
      path: '/choose_house',
      name: 'ChooseHouse',
      component: ChooseHouse
    },
    {
      path: '/choose_community',
      name: 'ChooseCommunity',
      component: ChooseCommunity
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/detail_maintaining',
      name: 'DetailMaintaining',
      component: DetailMaintaining
    },
    {
      path: '/my_maintaining',
      name: 'MyMaintaining',
      component: MyMaintaining
    },
    {
      path: '/submit_success',
      name: 'SubmitSuccess',
      component: SubmitSuccess
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/quest_survey',
      name: 'QuestSurvey',
      component: QuestSurvey
    },
    {
      path: '/store_detail',
      name: 'StoreDetail',
      component: StoreDetail
    },
    {
      path: '/points',
      name: 'Points',
      component: Points
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path: '/phone_detail',
      name: 'PhoneDetail',
      component: PhoneDetail
    },
    {
      path: '/phone_list',
      name: 'PhoneList',
      component: PhoneList
    },
    {
      path: '/fillIn',
      name: 'FillIn',
      component: FillIn
    },
    {
      path: '/notice/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/user/message_article',
      name: 'MsgArticle',
      component: MsgArticle
    },
    {
      path: '/pay/order_list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/pay/order_detail',
      name: 'OrderDetail',
      component: OrderDetail
    }
  ]
})
export default router;
