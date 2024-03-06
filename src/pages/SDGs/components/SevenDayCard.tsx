import { Card, Col, Row, Space } from "antd";

import React from "react";

import styles from "../style.less";

const SevenDayCard = ({ data, loading }: { data: { title: string; num: number; remainder: number }[]; loading: boolean }) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{ padding: 0 }}
    title="近七日上架獎勵兌換率排行"
    actions={[<a href="/hycms/report/exchange?mode=2&day=lastMonth">{"進一步查看 >"}</a>]}
  >
    <div className={styles.salesCard}>
      <Row>
        {data && data.map((_, i) => {
          if (i % 5 == 0 && i < 15) {
            return (
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <ul className={styles.rankingList}>
                    {data.map((item, ii) => {
                      if (ii >= i && ii < i + 5) {
                        var already = item.num - item.remainder;
                        if (already == 0) return;
                        return (
                          <li key={item.title}>
                            <span className={`${styles.rankingItemNumber} ${styles.active}`}>{ii + 1}</span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <Space style={{ display: "flex" }} size="large">
                              <span className={styles.rankingItemValue}>{already + "/" + item.num}</span>
                              <span className={styles.rankingItemValue}>{Math.round((already / item.num) * 100) + (item.num != 0 ? "%" : "")}</span>
                            </Space>
                          </li>
                        );
                      } else return <></>;
                    })}
                  </ul>
                </div>
              </Col>
            );
          } else return <></>;
        })}
      </Row>
    </div>
  </Card>
);

export default SevenDayCard;
