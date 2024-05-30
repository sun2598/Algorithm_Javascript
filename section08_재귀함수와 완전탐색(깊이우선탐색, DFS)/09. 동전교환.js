// <동전교환> - 중복순열과 유사
//다음과 같이 여러 단위의 동전들이 주어져 있을때 거슬러 줄 동전의 최소개수는?
//각 단위의 동전은 무한정 쓸 수 있다.
//동전의 종류개수 N(1<=N<=12), N개의 동전의 종류, 거슬러 줄 금액 M(1<=M<=500)
// n = 3
// 1 2 5 (동전의 종류)
// m = 15 (거슬러줘야하는금액)   => [5 5 5]로 3개가 최소개수임

//       0 1 2     시간복잡도줄이기     0 1 2
// arr [ 1 2 5 ]   ------------>   [ 5 2 1 ]
// D(L, sum)  -> L은 사용된 동전의 갯수, sum은 그 L개의 동전으로 만든 금액 합계
//                                 DFS(0,0)
//                        0           1          2              -> 사용하는 arr의 인덱스
//               DFS(1,5)          DFS(1,2)       DFS(1,1)
//            0    1    2        0    1    2      0    1    2   -> 사용하는 arr의 인덱스
//     DFS(2,10)DFS(2,7)DFS(2,6)
//       [5 5]   [5 2]   [5 1]

//    ... 이렇게 계속 뻗다가
//    sum == m 일때 멈추기. 그때의 L이 답임.

function solution(m, arr) {
    let answer = Number.MAX_SAFE_INTEGER; // 최소 동전 개수를 저장할 변수, 초기값은 매우 큰 수로 설정
    let n = arr.length; // 동전의 종류 개수
    arr.sort((a, b) => b - a); // 큰 동전부터 사용하도록 정렬 (시간복잡도줄이기)

    function DFS(L, sum) {
        if (sum > m) { // 현재 합이 거슬러 줄 금액을 넘으면 더 이상 탐색하지 않음
            return;
        }
        if (L >= answer) { // 현재 동전 개수가 이미 저장된 최소 개수보다 크면 더 이상 탐색하지 않음
            return;
        }
        if (sum === m) { // 현재 합이 거슬러 줄 금액과 같을 때
            answer = Math.min(answer, L);
        } else {
            for (let i = 0; i < n; i++) { // 각 동전 종류에 대해
                DFS(L + 1, sum + arr[i]); // 동전 개수를 하나 늘리고, 현재 동전의 값을 더하여 재귀 호출
            }
        }
    }

    DFS(0, 0); // 초기 호출: 동전 개수 0개, 합 0부터 시작
    return answer;
}

let arr = [1, 2, 5];
console.log(solution(15, arr)); // 3
