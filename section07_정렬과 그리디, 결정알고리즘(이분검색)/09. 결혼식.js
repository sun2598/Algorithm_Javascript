// 현수는 결혼식 피로연을 장소를 빌려 3일간 쉬지 않고 하려고 합니다.
// 피로연에 참석하는 친구들 N명의 참석하는 시간정보를 현수는 친구들에게 미리 요구했습니다. 
// 각 친구들은 자신이 몇 시에 도착해서 몇 시에 떠날 것인지 현수에게 알려주었습니다.
// 현수는 이 정보를 바탕으로 피로연 장소에 동시에 존재하는 최대 인원수를 구하여 그 인원을 수용할 수 있는 장소를 빌리려고 합니다. 
// 만약 한 친구가 오는 시간 13, 가는시간 15라면 이 친구는 13시 정각에 피로연 장에 존재하는 것이고 15시 정각에는 존재하지 않는다고 가정합니다.

function solution(times) {
    let answer = Number.MIN_SAFE_INTEGER; // 최대 인원 수를 저장할 변수, 초기값은 안전한 최소 정수

    // <그리디 알고리즘>
    // 모든 참석 시간과 퇴장 시간을 담을 배열
    let T_line = [];
    for (let x of times) {
        T_line.push([x[0], 's']); // 참석 시작 시간을 's'와 함께 저장
        T_line.push([x[1], 'e']); // 퇴장 시간을 'e'와 함께 저장
    }
    // 시간 순으로 정렬, 동일 시간이면 종료('e') 이벤트가 시작('s') 이벤트보다 먼저 처리
    T_line.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1].charCodeAt() - b[1].charCodeAt(); // 문자 코드 기준 정렬 ('e' < 's')
        } else {
            return a[0] - b[0]; // 시간에 따른 오름차순 정렬
        }
    });
    // [[5,'s'], [12,'s'], [14,'e'], [14,'s'], [15,'e'], [15,'s'], [18,'e'], [20,'e'], [20,'s'], [30,'e']]

    let cnt = 0; // 현재 시간에 피로연에 존재하는 인원 수
    for (let x of T_line) {
        if (x[1] === 's') {
            cnt++; // 참석 시작 이벤트인 경우, 인원 수 증가
        } else {
            cnt--; // 퇴장 이벤트인 경우, 인원 수 감소
        }
        answer = Math.max(answer, cnt); // 최대 인원 수 갱신
    }

    return answer;
}

let arr = [[14, 18], [12, 15], [15, 20], [20, 30], [5, 14]];
console.log(solution(arr));