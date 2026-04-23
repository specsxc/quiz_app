import supabase from "../services/supabase-client";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Avatar,
  Text,
  Title,
  Paper,
  Group,
  Badge,
} from "@mantine/core";

export default function Leaderboard() {
  const [lead, setLead] = useState([]);

  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const { data, error } = await supabase.from("names").select(
        `
    id,
    created_at,
    name,
    points
    `,
      );
      if (error) {
        throw error;
      }
      const sortedData = [...data].sort((a, b) => b.points - a.points);
      setLead(sortedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  console.log(lead);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        maxHeight: "100vh",
      }}
    >
      <Card
        shadow="xl"
        radius="lg"
        p={0}
        withBorder
        style={{ width: "100%", maxWidth: 950, overflow: "hidden" }}
      >
        <Paper
          p="xl"
          radius={0}
          style={{
            background: "linear-gradient(45deg, #228be6 0%, #15aabf 100%)",
            color: "white",
          }}
        >
          <Title order={2} ta="center">
            🏆 Player Ranking
          </Title>
        </Paper>

        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing="md"
          horizontalSpacing="lg"
        >
          <Table.Thead>
            <Table.Tr style={{ fontSize: "1rem" }}>
              <Table.Th ta="center">#</Table.Th>
              <Table.Th ta="center">Player</Table.Th>
              <Table.Th ta="center">Points</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {lead.map((player, index) => (
              <Table.Tr key={index} style={{ fontSize: "2rem" }}>
                <Table.Td ta="center">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  <Text style={{ fontSize: "1.25rem" }}>
                    {index > 2 && index + 1}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm" justify="center">
                    <Avatar
                      radius="xl"
                      size="md"
                      variant="filled"
                      color={
                        index === 0
                          ? "yellow.8"
                          : index === 1
                            ? "grey"
                            : index === 2
                              ? "#A0522D"
                              : "blue"
                      }
                    >
                      {player.name[0]}
                    </Avatar>
                    <Text size="lg" fw={index < 3 ? 600 : 400}>
                      {player.name}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td ta="center">
                  <Badge
                    variant="gradient"
                    gradient={
                      index === 0
                        ? { from: "orange", to: "yellow" }
                        : index === 1
                          ? { from: "#434343", to: "#979797" }
                          : index === 2
                            ? { from: "#804A00", to: "#CA7345" }
                            : { from: "blue", to: "cyan" }
                    }
                    size="xl"
                  >
                    {player.points} pts
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  );
}
