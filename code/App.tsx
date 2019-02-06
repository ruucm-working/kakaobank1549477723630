import { Data, animate, Override, Animatable } from "framer";

// 기본값 설정
const data = Data({
  currentTab: null,
  currentPageIndex: 0
});

// 탭 배열 만들기
let tabArray = [];

// 하단 탭 바의 자녀인 각 탭 메뉴를 배열에 등록
export const TabBar: Override = props => {
  tabArray = props.children;
};

// 각 탭 메뉴 설정
export const TabMenu: Override = props => {
  // 투명도 항목을 선언하고 0.2를 대입
  let tabOpacity = 0.2;
  // 현재 탭이 정의되지 않은 경우, 첫 번째 탭을 현재 탭으로 지정하기
  if (data.currentTab === null) data.currentTab = props.id;
  // 현재 탭 메뉴가 지정된 경우, 투명도 항목에 1을 대입
  if (data.currentTab === props.id) tabOpacity = 1;
  return {
    // 탭 메뉴의 투명도는 위에서 선언한 투명도 항목과 매칭
    opacity: tabOpacity,
    // 탭 배열 내에서 현재 탭의 순서를 찾고, 페이지 인덱스에 해당 순서를 대입
    onTap() {
      data.currentTab = props.id;
      let i = tabArray.findIndex(tab => {
        return data.currentTab === tab.props.id;
      });
      data.currentPageIndex = i;
    }
  };
};

// 페이지 영역 설정
// 페이지 인덱스에 따라 현재 페이지 이동
export const Page: Override = props => {
  return {
    currentPage: data.currentPageIndex,
    // 페이지 툴의 기본 애니메이션 제거
    animateCurrentPageUpdate: false
  };
};
